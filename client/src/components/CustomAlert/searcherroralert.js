



import './alert.css';

const remove = () => {document.getElementById('alert').style.display = "none"};

function SAlert() {



  return (
    <div className="Alert">
  <span class="closebtn" onClick={remove}>&times;</span> 
  <strong>Error!</strong> Please, enter a search term.
  <hr/>
    </div>
  );
}

export default SAlert;
