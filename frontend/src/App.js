import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Input, Table } from "reactstrap"

const api = "http://localhost:8000";
function App() {
  const [files, setFiles] = useState([])
  const getFiles = useCallback(async (params = "") => {
    try{
      const response = await fetch(`${api}/files/data${params}`)
      const filesResponse = await response.json()
      console.log(filesResponse)
      const arrayFiles = filesResponse.map(item => {
        const { file, lines} = item
        return lines.map(line => {
          return {
            ...line,
            file
          }
        })
      })
      setFiles(arrayFiles.flat(Infinity))
    }catch(e){
      setFiles([])
    }
  }, [])
  useEffect(() => {
    getFiles()
  }, [])

  const filterByFileName = (e) => {
    const text = e.target.value
    setTimeout(() => {
      getFiles(`?fileName=${text}`)
    }, 2000)
  }
  return (
    <div className="App">
      <div>
        <Input onChange={filterByFileName} placeholder='Filter by name' className='m-5'/>
      </div>
         <Table striped bordered hover>
        <thead>
          <tr>
            <th>File</th>
            <th>Txt</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {
            files.map((file, i) => {
              return(<>
                <tr key={i}>
                <th>{file.file}</th>
                <th>{file.text}</th>
                <th>{file.number}</th>
                <th>{file.hex}</th>
                </tr>
              </>)
            })
          }
        </tbody>
      </Table>
    </div>
  );
}

export default App;
