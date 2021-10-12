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
                categoriesList.rows.map((r, i) =>
                    <div className="row" key={i}>
                        {r.map((c, i) =>
                            <CategoryCard key={i} category={c} history={history} />
                        )}
                    </div>
                )}
        </section>
    )
}

export default HomeCategories
