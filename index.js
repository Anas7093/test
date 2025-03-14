import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/save-name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>أدخل اسمك</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='اكتب اسمك هنا'
          required
        />
        <button type='submit'>إرسال</button>
      </form>
    </div>
  );
}

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name } = req.body;
    const filePath = path.join(process.cwd(), 'names.json');

    let names = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath);
      names = JSON.parse(fileData);
    }

    names.push(name);
    fs.writeFileSync(filePath, JSON.stringify(names, null, 2));

    res.status(200).json({ message: 'تم حفظ اسمك بنجاح!' });
  } else {
    res.status(405).json({ message: 'الطريقة غير مدعومة' });
  }
}
