import logo from "./logo.svg";
import "./App.css";
import { useState } from "react"; //state를 사용하기 위해

//사용자 정의 태그 생성 , 대문자로 시작해야함
function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={"/read/" + t.id}
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id)); //id는 태그의 속성id이기 때문에 string
          }}
        >
          {t.title}
        </a>
      </li>
    );
  }
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onCeate(title, body);
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title"></input>
        </p>
        <p>
          <textarea name="body" placeholder="body" />
        </p>
        <p>
          <input type="submit" value="Create"></input>
        </p>
      </form>
    </article>
  );
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  return (
    <article>
      <h2>Update</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const _title = event.target.title.value;
          const _body = event.target.body.value;
          props.onUpdate(_title, _body);
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          ></input>
        </p>
        <p>
          <textarea
            name="body"
            placeholder="body"
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
            }}
          ></textarea>
        </p>
        <p>
          <input type="submit" value="Update"></input>
        </p>
      </form>
    </article>
  );
}
//main
function App() {
  const [mode, setMode] = useState("WELCOME"); //상태로 만드는 것, useState: 배열을 return [0]:state값,[1]:state를 변경할때 사용하는 함수
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ]);
  let content = null;
  let contextControl = null;

  if (mode === "WELCOME") {
    content = <Article title="WElCOME" body="Hello, React"></Article>;
  } else if (mode === "READ") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>;
    contextControl = (
      <>
        <li>
          <a
            href={"/update" + id}
            onClick={(event) => {
              event.preventDefault();
              setMode("UPDATE");
            }}
          >
            Update
          </a>
        </li>
        <li>
          <input
            type="button"
            value="Delete"
            onClick={() => {
              const newTopics = [];
              for (let i = 0; i < topics.length; i++) {
                if (topics[i].id !== id) {
                  newTopics.push(topics[i]);
                }
              }
              setTopics(newTopics);
              setMode("WELCOME");
            }}
          ></input>
        </li>
      </>
    );
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCeate={(title, body) => {
          const newTopic = { id: nextId, title: title, body: body };
          //Object state를 변경하는 방법: 복제본을 변경
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics); //원래 데이터와 비교하여 다르다면 그때 rendering
          setNextId(nextId + 1);
          setMode("READ");
          setId(nextId);
        }}
      ></Create>
    );
  } else if (mode === "UPDATE") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = (
      <Update
        title={title}
        body={body}
        onUpdate={(title, body) => {
          const update = { id: id, title: title, body: body };
          const updatedTopics = [...topics];
          for (let i = 0; i < updatedTopics.length; i++) {
            if (updatedTopics[i].id === id) {
              updatedTopics[i] = update;
              break;
            }
          }
          setTopics(updatedTopics);
          setMode("READ");
        }}
      ></Update>
    );
  }

  return (
    <div className="App">
      <Header
        title="REACT"
        onChangeMode={() => {
          setMode("WELCOME");
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(id) => {
          setMode("READ");
          setId(id);
        }}
      ></Nav>
      {content}
      <ul>
        <li>
          <a
            href="/create"
            onClick={(event) => {
              event.preventDefault();
              setMode("CREATE");
            }}
          >
            Create
          </a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
