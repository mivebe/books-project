const CategoryCard = ({ category, history }) => {


    const handleCategory = (e) => {
        history.push({
            pathname: "/all-books",
            search: history.location.search ? history.location.search + `&category${category}` : `?category=${category}`,
            state: { ...history.location.state, category: category }
        })
    }

    return (
        <div className="col-1-of-4">
            <div className="category-box" onClick={handleCategory}>
                <i className="category-box__icon icon-basic-world" />
                <h3 className="heading-tertiary u-margin-bottom-small">{category}</h3>
                <p className="category-box__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                </p>
            </div>
        </div>
    )
}

export default CategoryCard
