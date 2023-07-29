import React, { useState,useEffect } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../components/Authentication/AuthProvider";
import firebase from "firebase/app";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
// import Cards from "../Cards";
import "firebase/storage";
import {
  FormControl,
  FormLabel,
  Textarea,
  Stack,
  Input,
} from "@chakra-ui/react";

// import { Card, CardHeader, CardBody, CardFooter , Image ,Heading , Text , Divider  , ButtonGroup } from "@chakra-ui/react";

var firebaseConfig = {
  apiKey: "AIzaSyCSrMWUnTQ8tj_T0QLHHDOqwgHQirVOiCk",
  authDomain: "auth-856ff.firebaseapp.com",
  projectId: "auth-856ff",
  storageBucket: "auth-856ff.appspot.com",
  messagingSenderId: "923321064950",
  appId: "1:923321064950:web:9d22a84095bf636463bbd7",
  measurementId: "G-J0LMTW1W5C",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const Dashboard = () => {
  const [banner, setBanner] = useState(null);
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [tags, setTags] = useState([]);
  const [author, setAuthor] = useState("");
  const [isVis, setIsVis] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const handleBannerChange = (e) => {
    setBanner(e.target.files[0]);
  };
  useEffect(() => {
    // Fetch the blogs collection from Firebase Firestore
    const db = firebase.firestore();
   
    db.collection("blogs")
      .get()
      .then((querySnapshot) => {
        const blogData = [];
        querySnapshot.forEach((doc) => {
          // Convert the document data to an object and add it to the blogData array
          blogData.push({ id: doc.id, ...doc.data() });
        });
        setBlogs(blogData);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    // Upload the banner image to Firebase Storage
    const storageRef = firebase.storage().ref();
    const bannerRef = storageRef.child(`banners/${banner.name}`);
    bannerRef
      .put(banner)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .then((bannerURL) => {
        // Save the blog entry to Firebase Firestore
        const db = firebase.firestore();
        db.collection("blogs").add({
          banner: bannerURL,
          title,
          article,
          tags, // Convert tags to an array
          author,
          date: new Date().toISOString(),
        });
        setIsVis(true);
        setTimeout(() => {
          setIsVis(false);
        }, 5000);
        // Clear the form after submission
        setBanner(null);
        setTitle("");
        setArticle("");
        setTags([]);
        setAuthor("");
      })
      .catch((error) => {
        console.error("Error uploading banner:", error);
      });
  };

  const { logout } = useContext(AuthContext);

  return (
    <div>
      <Button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </Button>

      <Stack spacing={4} direction="column" align="center">
        <FormControl
      style={{
        paddingLeft: 2+"em",
        paddingRight: 2+"em",
        paddingTop: 3+"em"
      }}
    
        >
          <FormLabel>Banner</FormLabel>
          <Input type="file" onChange={handleBannerChange} />

          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <FormLabel>Article</FormLabel>
          <Textarea
            value={article}
            onChange={(e) => setArticle(e.target.value)}
          />

          <FormLabel>Tags seperated by commmas</FormLabel>
          <Input
            type="text"
            value={tags.join(", ")}
            onChange={(e) =>
              setTags(e.target.value.split(",").map((tag) => tag.trim()))
            }
          />

          <FormLabel>Author</FormLabel>
          <Input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <Button onClick={handleBlogSubmit} colorScheme="teal" size="lg">
            Submit
          </Button>
        </FormControl>
      </Stack>

      {isVis ? (
        <Alert status="success">
          <AlertIcon />
          Data uploaded to the server. Fire on!
        </Alert>
      ) : (
        <div></div>
      )}
 {blogs.map((blog) => (
  
        <div key={blog.id} class="card" style={{width: "18rem",margin:"2rem",color:"black"}}>
          <img src={blog.banner} class="card-img-top" style={{width:"300px"}} alt="..." />
          <div class="card-body">
            <h5 class="card-title">{blog.title}</h5>
            <p class="card-text">
            {blog.article}
            <br/>
            Tags: {blog.tags.join(", ")}
            </p>
            <a href="#" class="btn btn-primary">
            {blog.author}
            </a>
            <a href="#" class="btn btn-primary">
            {blog.date}
            </a>
          </div>
        </div>
  ))}
      
      
    </div>
  );
};

export default Dashboard;
