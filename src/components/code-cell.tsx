import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

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
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            onChange={(value) => setInput(value)}
            initialValue='const a = 1;'
          />
        </Resizable>

        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
