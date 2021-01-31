let value = 0;
let x = 0;
let y = 0;
let operation = '';

let addEndpoint,minusEndpoint,moduloEndpoint,multiplyEndpoint,squareEndpoint,divideEndpoint,saveEndpoint = undefined

const PROXY_URLS = [
	{
		url: 'http://webcalc-proxy.40176750.qpc.hal.davecutting.uk/'
	},
	{
		url: 'http://webcalc-proxy-2.40176750.qpc.hal.davecutting.uk/'
	},
]

async function onStart() {
	await getAllEndpoints()
		.then(endpoint => {
			addEndpoint = endpoint.add;
			minusEndpoint = endpoint.subtract;
			moduloEndpoint = endpoint.modulo;
			multiplyEndpoint = endpoint.multiply;
			squareEndpoint = endpoint.square;
			divideEndpoint = endpoint.divide;
			saveEndpoint = endpoint.save;
		})
		.then(() => Display())
}

async function getAllEndpoints() {
	const response = await fetch('./endpoints.json')

	if (!response.ok || response.status === 400) {
    const message = `An error has occured with fetching routes: ${response.status}`;
    throw new Error(message);
	}
	
	const result = await response.json()
	return result
}

function Display()
{
    document.getElementById('display').value = value;
}

function Clear()
{
    value = 0;
    x = 0;
    y = 0;
    operation = '';
    Display();
}

function resetOperations() {
	x = 0;
	y = 0;
	operation = '';
}

function NumClick(n)
{
    if (value == 0)
        value = n;
    else
    {
        value *= 10;
        value += n;
    }

    Display();
}

function Plus()
{
    // if we have an outstanding operation resolve it
    if (operation != '')
        Equals();

    x = value;
    value = 0;
    operation = '+';

    Display();
}

function Minus()
{
    // if we have an outstanding operation resolve it
    if (operation != '')
        Equals();

    x = value;
    value = 0;
    operation = '-';

    Display();
}

function Modulo()
{
    if (operation != '')
        Equals();

    x = value;
    value = 0;
    operation = '%';

    Display();
}

function Multiply()
{
    if (operation != '')
        Equals();

    x = value;
    value = 0;
    operation = '*';

    Display();
}

function Square()
{
    if (operation != '')
        Equals();

    x = value;
    value = 0;
    operation = 's';

    Display();
}

function Divide()
{
    if (operation != '')
        Equals();

    x = value;
    value = 0;
    operation = '/';

    Display();
}

async function opertaionPromiseCall(query) {
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'webcalc',
		},
		mode: 'cors',
		cache: 'default',
	}

	const urlNum = 0
	const response = await fetchService(query, options, urlNum)

	if (response.status === 404) {
		const message = `URL not found ${response.url}: ${response.status}`;
		throw new Error(message);			
	}

	if (response.status === 403) {
		const message = `You are not authorised to access ${response.url}: ${response.status}`;
		throw new Error(message);			
	}

	if (!response.ok || response.status === 400) {
    const message = `An error has occured with ${response.url}: ${response.status}`;
    throw new Error(message);
	}
	
	const result = await response.json()
	return result
}

async function fetchService(query, options, urlNum = 0) {
	let serviceURL = PROXY_URLS[urlNum].url + query

	try {
			const response = await fetch(serviceURL, options)
			if(!response.ok || response.status !== 200) {
					throw new Error("Invalid response from service url");
			}

			return response;
	} catch(err) {
			if (urlNum >= PROXY_URLS.length) throw err;
			return await fetchService(query, options, urlNum + 1);
	}
}

async function getSavedResult(endpoint = '') {
	const headers = new Headers({
		'Content-Type': 'application/json',
		'Authorization': 'webcalc'
	})

	const options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin',
    headers: headers
	}

	const urlNum = 0
	const response = await fetchService(endpoint, options, urlNum)
  return response.json();
}

async function postResult(endpoint = '', data = {}) {
	const headers = new Headers({
		'Content-Type': 'application/json',
		'Authorization': 'webcalc'
	})

	const options = {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: headers,
    body: JSON.stringify(data)
	}

	const urlNum = 0
	const response = await fetchService(endpoint, options, urlNum)
  return response.json();
}

async function saveResult() {
	postResult(saveEndpoint, { answer: value })
		.then(response => {
			window.alert(`Answer ${ response.answer } has been saved to the 'recall' button`)
		})
}

async function getResult() {
	getSavedResult(saveEndpoint)
		.then(response => {
			answer = response[0].answer
			NumClick(answer)
		});
}

async function Equals()
{
    if (operation == '')
        return;

    y = value;

    if (operation == '+')
    {
			const query = addEndpoint+"?x="+x+"&y="+y

			opertaionPromiseCall(query)
				.then(result => {
					if(result.error || result.error === undefined) {
						throw new Error("Error caught in addition get call")
					} 
					resetOperations()
					value = result.answer;
					Display();
				})
				.catch(err => runError(err.message))

        return;
    }
    else if (operation == '-')
    {
			const query = minusEndpoint+"?x="+x+"&y="+y

			opertaionPromiseCall(query)
			.then(result => {
				if(result.error || result.error === undefined) {
					throw new Error("Error caught in subtraction get call")
				} 
				resetOperations()
				value = result.answer;
				Display();
			})
			.catch(err => runError(err.message))

			return;
    }
		else if (operation == '%')
    {
			const query = moduloEndpoint+"?x="+x+"&y="+y

			opertaionPromiseCall(query)
			.then(result => {
				if(result.Error || result.Error === undefined) {
					throw new Error("Error caught in modulo get call")
				} 
				resetOperations()
				value = result.Answer;
				Display();
			})
			.catch(err => runError(err.message))

			return;
    }
		else if (operation == '*')
    {
			const query = multiplyEndpoint+"?x="+x+"&y="+y

			opertaionPromiseCall(query)
			.then(result => {
				if(result.error || result.error === undefined) {
					throw new Error("Error caught in multiply get call")
				} 
				resetOperations()
				value = result.answer;
				Display();
			})
			.catch(err => runError(err.message))

			return;
    }
		else if (operation == 's')
    {
			const query = squareEndpoint+"?x="+x

			opertaionPromiseCall(query)
			.then(result => {
				if(result.error || result.error === undefined) {
					throw new Error("Error caught in square get call")
				} 
				resetOperations()
				value = result.answer;
				Display();
			})
			.catch(err => runError(err.message))

			return;
    }
		else if (operation == '/')
    {
			const query = divideEndpoint+"?x="+x+"&y="+y

			opertaionPromiseCall(query)
			.then(result => {
				if(result.error || result.error === undefined) {
					throw new Error("Error caught in divide get call")
				} 
				resetOperations()
				value = result.answer;
				Display();
			})
			.catch(err => runError(err.message))

			return;
    }
}

function runError(err) {
	window.alert(err);
	Clear()
}