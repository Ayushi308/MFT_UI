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
        console.log(file.updateTime);
        console.log(parseInt(file.updateTime, 10));
        console.log(typeof file.updateTime);
        console.log(file.updateTime);
        if (parseInt(file.updateTime) < 99999999999){
            var newnew = new Date(parseInt(file.updateTime)*1000);
            row.insertCell().textContent = new Date(newnew).toString();
        } else {
            var newnew = new Date(parseInt(file.updateTime));
            row.insertCell().textContent = new Date(newnew).toString();
        }
        
    });
    

    dirStore = files.directory.directories;
    dirStore.forEach(file1 => {
        const row = table.insertRow();
        row.insertCell().textContent = file1.friendlyName;
        console.log(file1.friendlyName);
        row.insertCell().textContent = 'DIR';
        row.insertCell().textContent = 'N/A';
        row.insertCell().textContent = file1.resourcePath;
        const time = file1.updateTime;
        console.log(time);
        var timely = file1.updateTime;
        console.log(timely);
        if (parseInt(time) < 9999999999){
            var newnew = new Date(parseInt(timely)*1000);
        } else {
            var newnew = new Date(parseInt(timely));
        }
        
        row.insertCell().textContent = newnew;
        console.log(newnew);
    });


    fileListDiv.appendChild(table);
}
