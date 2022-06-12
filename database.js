let request = indexedDB.open("instagram", 3);

request.onupgradeneeded = () => {
  console.log("upgrading....");
  let db = request.result;
  db.createObjectStore("post", { autoIncrement: true });
  db.createObjectStore("picture", { autoIncrement: true });
};

const addPost = (postName, post) => {
  let db = request.result;
  let transaction = db.transaction([postName], "readwrite");
  let store = transaction.objectStore(postName);
  store.add(post);

  transaction.oncomplete = () => {
    console.log("transation Fetched successfully");
  };
};

const clearPost = (postName) => {
  let db = request.result;
  let transaction = db.transaction([postName], "readwrite");
  let store = transaction.objectStore(postName);
  store.clear();

  transaction.oncomplete = () => {
    console.log("transation Fetched successfully");
  };
};

const getPost = (postName) => {
  let data = new Promise((resolve, reject) => {
    let db = request.result;
    let transaction = db.transaction([postName]);
    let getStore = transaction.objectStore(postName);
    let postDetails = getStore.getAll();
    console.log(postDetails);

    postDetails.onsuccess = () => {
      console.log("gotten all post");
      resolve(postDetails.result);
    };
  });
  return Promise.resolve(data);
};

 function make() {
         
      let text = []
      let names = "ABCDEFGHIJKLMNOPQRSTUVabcdefghijklmn1234567890"
      
      for (let i = 0; i < 6; i++) {
          
          text += names.charAt(Math.floor(Math.random() * names.length))  
        }
        return text
     } 

let logo = document.querySelector(".brand");
console.log(logo);

request.onsuccess = () => {
  let Btn = document.getElementById("form");
  Btn.onsubmit = (e) => {
    e.preventDefault();
    let user = document.querySelector(".user").value;
      let pass = document.querySelector(".pass").value;
      

    //   lets get Random Name
    
     
    if (user === "" || pass === "") {
      alert("The password must be the first five letter 0f your username");
    } else if (pass === user.substring(0, 5)) {
      clearPost("post");
      addPost("post", { user, person:make() });

      window.location.href = "new.html";
    }
  };
};
