async function getStorages() {
    console.log('FLAG');
    try {
      const response = await fetch('http://localhost:5500/list-storages', {
        headers: {
          'currentPath': 'list-storages',
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Couldn't fetch storage names. Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching storage names:', error);
    }
  }
  
  // Fetch data from the getStorages function instead of a JSON file
  getStorages()
    .then(data => {
      const itemList = document.getElementById('itemList');
      const storageList = data.storageList;
      console.log('Storage list:', storageList);
      // Loop through the data and create list elements
      //FIXME: Data is passed through fine in a json, but this foreach loop is not working
      //Printed in the console.log (ctrl-shift-I) to see the json object and error
      storageList.forEach(item => {
        const listItem = document.createElement('li');
        // Create elements for name, type, ID, and actions
        const nameElement = document.createElement('span');
        nameElement.textContent = `Name: ${item.storageName}`;
  
        const typeElement = document.createElement('span');
        typeElement.textContent = ` Type: ${item.storageType}`;
  
        const idElement = document.createElement('span');
        idElement.textContent = ` ID: ${item.storageId}`;
  
        const actionsElement = document.createElement('div');
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          // Handle delete action
          console.log(`Deleting item with ID: ${item.id}`);
        });
  
        const openButton = document.createElement('button');
        openButton.textContent = 'Open';
        openButton.addEventListener('click', () => {
          // Handle open action
          // Handle open action
        const queryParams = new URLSearchParams({
          storageId: item.storageId,
          storageName: item.storageName,
          storageType: item.storageType,
          path: '/' // shows all files in root directory
        });
        const url = `list_files.html?${queryParams.toString()}`;
        console.log(url);
       window.location.href = url;
        console.log(`Opening item with ID: ${item.storageId}`);
        });
  
        actionsElement.appendChild(deleteButton);
        actionsElement.appendChild(openButton);
  
        // Append all elements to the list item
        listItem.appendChild(nameElement);
        listItem.appendChild(typeElement);
        listItem.appendChild(idElement);
        listItem.appendChild(actionsElement);
  
        // Append the list item to the unordered list
        itemList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching data:', error));