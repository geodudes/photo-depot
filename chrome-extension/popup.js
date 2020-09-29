chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.msg === "imageUrl_sent") {
          //  To do something
          console.log(request.data.subject)
          console.log(request.data.content)
          document.querySelector('#image-address').innerText = request.data.content;
      }
  }
);