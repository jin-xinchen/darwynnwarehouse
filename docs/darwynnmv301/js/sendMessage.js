//From DomainA to DomainB, send data 
document.getElementById('id_Recv').onclick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: RecvFromDomainA
        });
    });
}
document.getElementById('id_Send').onclick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: SendToDomainB
        });
    });
}

function RecvFromDomainA() {
    let value = document.getElementById('CURUSERID').value;
    chrome.runtime.sendMessage({ method: 'Send', key: 'key', value: value }, () => {});
}

function SendToDomainB() {
    chrome.runtime.sendMessage({ method: 'Recv', key: 'key' }, (response) => {
        document.getElementById('CHECKNUM').value = response.value;
    });
}