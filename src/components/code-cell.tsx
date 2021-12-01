import { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';

const CodeCell = () => {
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
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <CodeEditor
          onChange={(value) => setInput(value)}
          initialValue='const a = 1;'
        />

        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
