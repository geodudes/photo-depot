// Event listener to handle incoming message from context menu.  This contains the image url.
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.msg === "imageUrl_sent") {
          console.log(request.data.subject)
          console.log(request.data.content)
          const shortenedUrl = request.data.content.substring(0, 20).concat('...')
          document.querySelector('#image-address').innerText = shortenedUrl;
      }
  }
);