//==========="Background" Scripts===========//
let contextMenuItem = {
  id: "photoDepot",
  title: "Photo Depot",
  contexts: ["image"]
};

// Create context menu
chrome.contextMenus.create(contextMenuItem);

// Event listener for when contect menu item is selected
chrome.contextMenus.onClicked.addListener(image => {
  // Send request to server with image url - i.e. image.src.Url
  fetch('/photos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: image.srcUrl
    })
  })
  .then(res => res.json())
  .then(res => console.log('RESPONSE: ', res))
  .catch(err => console.log('Error: ', err))

  // Send image url to popup as a message
  chrome.runtime.sendMessage({
    msg: "imageUrl_sent", 
    data: {
        subject: "Image url:",
        content: image.srcUrl
    }
  });
})

