import classes from './DogItem.module.css';
import { useDogsContext } from './PageContainer';


const DogItem = ({dog}: any) => {
    const { updateMatch } = useDogsContext();

    const handleClick = (addRemove: string, id: string) => {
        updateMatch(id, addRemove);
    }

    return (
        <li className={classes.listItem}>
            <img src={dog.img} alt={dog.name} />
            <div>Name: {dog.name}</div> 
            <div>Age: {dog.age}</div> 
            <div>Beed: {dog.breed}</div> 
            <div><button onClick={() => handleClick('remove', dog.id)}>Remove</button><button onClick={() => handleClick('add', dog.id)}>Add</button></div>           
        </li>
    )
}

export default DogItem;