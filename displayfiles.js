document.addEventListener('DOMContentLoaded', async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const storageId = queryParams.get('storageId');
    const storageName = queryParams.get('storageName');
    const storageType = queryParams.get('storageType');
    const path = queryParams.get('path');

    console.log('Storage ID:', storageId);
    console.log('Storage Name:', storageName);
    console.log('Storage Type:', storageType);
    console.log('Path:', path);

    // Fetch file data from the backend
    try {
        const response = await fetch(`http://localhost:5500/list-storages/${storageId}`, {
            headers: {
                storagetype: storageType,
                path: path
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const files = await response.json();
        console.log('Files:', files);
        buildTable(files);
    } catch (error) {
        console.error('Error fetching files:', error);
    }
});

function buildTable(files) {
    const fileListDiv = document.getElementById('fileList');
    const table = document.createElement('table');

    // Create table header
    const headerRow = table.insertRow();
    const headers = ['Name','Type', 'File Size', 'File Path', 'Last Modified'];
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });

    // Populate table with file data
    fileStore = files.directory.files;
    fileStore.forEach(file => {
        const row = table.insertRow();
        row.insertCell().textContent = file.friendlyName;
        console.log(file.friendlyName);
        row.insertCell().textContent = 'FILE';
        row.insertCell().textContent = file.resourceSize;
        console.log(file.resourceSize);
        row.insertCell().textContent = file.resourcePath;
        console.log(file.resourcePath);
        row.insertCell().textContent = new Date((file.updateTime * 1000)).toString();
        console.log(file.updateTime);
    });
    
//     1714431919000
// displayfiles.js:74 1714335357

    //1706735398147000
    //1706735398147
    

    dirStore = files.directory.directories;
    dirStore.forEach(file1 => {
        const row = table.insertRow();
        row.insertCell().textContent = file1.friendlyName;
        console.log(file1.friendlyName);
        row.insertCell().textContent = 'DIR';
        row.insertCell().textContent = 'N/A';
        row.insertCell().textContent = file1.resourcePath;
        const time = file1.createdTime;
        console.log(time);
        row.insertCell().textContent = new Date((time)).toString();
        console.log(file1.updateTime);
    });

    fileListDiv.appendChild(table);
}
