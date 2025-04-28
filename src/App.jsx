import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newStudentName, setNewStudentName] = useState('');

  // Carregar os estudantes do localStorage
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(storedStudents);
  }, []); // Esse useEffect só rodará uma vez, quando o componente for montado.

  // Salvar os estudantes no localStorage sempre que o estado de students mudar
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('students', JSON.stringify(students));
    }
  }, [students]); // Esse useEffect é disparado sempre que a lista de estudantes muda.

  const addStudent = () => {
    if (newStudentName.trim() === '') return;
    const newStudent = {
      id: Date.now(),
      name: newStudentName,
      image: "https://via.placeholder.com/150",
    };
    setStudents((prevStudents) => [...prevStudents, newStudent]);
    setNewStudentName('');
  };

  const removeStudent = (id) => {
    const updated = students.filter(student => student.id !== id);
    setStudents(updated);
  };

  const editStudent = (id) => {
    const newName = prompt("Digite o novo nome:");
    if (newName && newName.trim() !== '') {
      const updated = students.map(student =>
        student.id === id ? { ...student, name: newName } : student
      );
      setStudents(updated);
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lista de Estudantes</h1>

      <input
        type="text"
        placeholder="Pesquisar estudante..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Adicionar estudante"
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
          className="flex-grow p-2 border rounded-l"
        />
        <button onClick={addStudent} className="bg-blue-500 text-white p-2 rounded-r">
          Adicionar
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredStudents.map(student => (
          <div key={student.id} className="flex items-center border p-4 rounded shadow">
            <img src={student.image} alt="Estudante" className="w-16 h-16 rounded-full mr-4" />
            <div className="flex-1">
              <h2 className="text-xl">{student.name}</h2>
            </div>
            <button
              onClick={() => editStudent(student.id)}
              className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
            >
              Editar
            </button>
            <button
              onClick={() => removeStudent(student.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
