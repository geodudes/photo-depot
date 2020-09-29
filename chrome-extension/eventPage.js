//==========="Background" Scripts===========//
let contextMenuItem = {
  id: "photoDepot",
  title: "Photo Depot",
  contexts: ["image"]
};

chrome.contextMenus.create(contextMenuItem);

// chrome.contextMenus.removeAll(function() {
//   chrome.contextMenus.create(contextMenuItem);
// });

chrome.contextMenus.onClicked.addListener(image => {
  // alert(`${image.srcUrl}`)
  // image.srcUrl
  // document.querySelector('#image-address').innerText = image.srcUrl;
  // sessionStorage.setItem('TestURL', image.srcUrl)
  // console.log('Saved')
  chrome.runtime.sendMessage({
    msg: "imageUrl_sent", 
    data: {
        subject: "Image url:",
        content: image.srcUrl
    }
  });
})

