



import './alert.css';

const remove = () => {document.getElementById('alert').style.display = "none"};

function Alert() {



  return (
    <div className="Alert">
  <span className="closebtn" onClick={remove}>&times;</span> 
  <strong>Failed!</strong> Please, login to perform action.
  <hr/>
    </div>
  );
}

export default Alert;
