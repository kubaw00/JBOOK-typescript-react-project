import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import CodeEditor from './components/code-editor';
import Preview from './components/preview';
import bundle from './bundler';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    // const res = await ref.current.transform(input, {
    //   loader: 'jsx',
    //   target: 'es2015',
    // })
    // setCode(res.code);
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        onChange={(value) => setInput(value)}
        initialValue='const a = 1;'
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
