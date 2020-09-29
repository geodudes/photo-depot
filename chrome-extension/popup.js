// Event listener to handle incoming message from context menu.  This contains the image url.
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.msg === "imageUrl_sent") {
          // Extract url and display
          const shortenedUrl = request.data.urlId[0].substring(0, 20).concat('...')
          document.querySelector('#image-address').innerText = shortenedUrl;

          // Extract image id and display
          const imageId = request.data.urlId[1];
          document.querySelector('#image-id').innerText = imageId;
      }
  }
);