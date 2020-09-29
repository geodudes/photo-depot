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
  const imageUrl = image.srcUrl;
  // Send request to server with image url - i.e. image.src.Url
  fetch('http://localhost:3000/images', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: imageUrl
    })
  })
  .then(res => res.json())
  .then(res => {

    res.photoid
    // Send image url and response id, respectively, to popup
    chrome.runtime.sendMessage({
      msg: "imageUrl_sent", 
      data: {
          urlId: [imageUrl, res.photoid],
      }
    });
  })
  .catch(err => console.log('Error: ', err))
})

