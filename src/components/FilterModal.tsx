import { useImperativeHandle, useRef, memo } from "react"
import classes from './FilterModal.module.css';

type pageContainer = {
    data: [] | undefined, 
    ref: any,
    update: (breed: string) => void
}

const FilterModel = ({ ref, data, update }: pageContainer) => {
    const dialog = useRef<HTMLDialogElement>(null);    

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog?.current?.showModal();
            }
        }
    });

    const handleClose = () => {
        dialog?.current?.close();
    }

    return (
        <>
            <dialog ref={dialog} className={classes.modal}>
                <div>
                    <header>Select Breed(s)</header>
                    <main className={classes.container}>
                        {
                            data?.map(x => {
                                return (
                                    <div key={x}>
                                        <input type='checkbox' key={x} value={x} name={x} onClick={() => update(x)} />
                                        <label htmlFor={x}>{x}</label>
                                    </div>
                                )
                            })
                        }                                 
                    </main>
                    <footer>                       
                        <button id="closeModal" onClick={handleClose}>Close</button>
                    </footer>
                </div> 
            </dialog>
        </>
    )
}

export default memo(FilterModel);