import './index.scss'

function SearchBar(){
    return(
        <div className ="navbar navbar-dark bg-dark">
            <div className="container">
                <form className="w-75 text-end">
                    <input type="text" className="border" placeholder="" />
                </form>
            </div>
        </div>
    )
}

export default SearchBar;