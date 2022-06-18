let loader = document.querySelector(".loader");


window.onload = () => { 
  loader.style.display = "none";
};

let instagramPost = [{
  name: "Elizabeth",
  profile: "img/dark.jpg",
  design:"img/dish.jpg",
  description: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut",
},
  {
     name: "John Jones",
    profile: "img/ben.jpg",
    design:"img/burger.jpg",
    description: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
     name: "Jack doe",
    profile: "img/pot.jpg",
    design:"img/design.jpg",
    description : "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
     name: "Gucci mane",
    profile: "img/christ.jpg",
    description: "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae"
  },
  {
     name: "Micheal b jordan",
    profile: "img/foto.jpg",
    design: "img/howel.jpg",
    description:  "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error"
  },
  {
     name: "Kelvin Mitnick",
    profile: "img/mike.jpg",
    design: "img/ford.jpg",
    description:"enim et ex nulla\nomnis voluptas quia qui\nvoluptatem consequatur numquam aliquam sunt\ntotam recusandae id dignissimos aut sed asperiores deserunt"
  },
  {
     name: "Micheal scotfied",
    profile: "img/marcos-paulo-prado-QYVCzK-bnYU-unsplash.jpg",
    design: "img/tab.jpg",
    description:"alias dolor cumque\nimpedit blanditiis non eveniet odio maxime\nblanditiis amet eius quis tempora quia autem rem\na provident perspiciatis quia"
  },
 
]

//loader first page

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
      addPost("post", { user, instagramPost, person:make() });

      window.location.href = "Home/Home.html";
    }
  };
};
