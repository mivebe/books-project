import { useHistory } from "react-router";
import categoriesList from "../data/categoryList.json";
import CategoryCard from "./CategoryCard";

const HomeCategories = () => {
    const history = useHistory()

    return (
        <section className="section-categories">

            <div className="u-center-text u-margin-bottom-big">
                <h2 className="heading-secondary">
                    Categories
                </h2>
            </div>

            {categoriesList &&
                categoriesList.rows.map(r =>
                    <div className="row">
                        {r.map(c =>
                            <CategoryCard category={c} history={history} />
                        )}
                    </div>
                )}
        </section>
    )
}

export default HomeCategories
