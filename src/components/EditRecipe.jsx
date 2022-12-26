import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "react-router-dom";
import { addRecipeData, updateRecipeData } from "../store/reducers/recipeSlice";
import Error from "./Error";
import Loader from "./Loader";
import PreviewImage from "./PreviewImage";

const EditRecipe = () => {
  const recipeName = document.URL.split("/").pop();
  const handleDeleteImage = () => {
    setFormData((formData) => ({
      ...formData,
      recipeImage: null,
      previewImage: null,
    }));
  };
  const data = useSelector((state) => state.recipe.recipeData);
  const recipeData = data.filter((ele) => ele.recipeName === recipeName)[0];
  const imageFileRef = useRef();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    recipeName: recipeData?.recipeName || "",
    description: recipeData?.description || "",
    recipeImage: null,
    previewImage: (
      <PreviewImage
        src={recipeData?.recipeImgSrc}
        handleDeleteImage={handleDeleteImage}
      />
    ),
    favourite: recipeData.favourite,
    recipeImgSrc: recipeData?.recipeImgSrc,
    ingredientsNum: recipeData?.ingredientsNum || 0,
    ingredients: recipeData?.ingredients || [],
  });
  const [formValidation, setFormValidation] = useState({
    errorrecipeName: null,
    errordescription: null,
    errorpreviewImage: null,
    erroringredientsNum: null,
    erroringredients: null,
  });
  const [btnInfo, setBtnInfo] = useState("Edit Recipe");
  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleChangeIngredient = (e) => {
    if (e.target.value < 0) return;
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
      ingredients: Array.from(Array(Number(e.target.value)).keys()).map(
        (ele) => ({ id: ele, ingredient: "", value: "" })
      ),
    }));
  };

  const handleChangeIngredientData1 = (e) => {
    setFormData((formData) => {
      const ingredientData = { ...formData.ingredients[e.target.name] };
      ingredientData.ingredient = e.target.value;
      formData.ingredients[e.target.name] = { ...ingredientData };
      return {
        ...formData,
      };
    });
  };
  const handleChangeIngredientData2 = (e) => {
    if (e.target.value < 0) return;
    setFormData((formData) => {
      const ingredientData = { ...formData };
      ingredientData.ingredients[e.target.name].value = e.target.value;
      return {
        ...ingredientData,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.recipeName.length === 0) {
      setFormValidation((formValidation) => ({
        ...formValidation,
        errorrecipeName: <Error msg="Recipe Name is required" />,
      }));
      setTimeout(
        () =>
          setFormValidation((formValidation) => ({
            ...formValidation,
            errorrecipeName: null,
          })),
        2000
      );
      return;
    }
    if (formData.description.length === 0) {
      setFormValidation((formValidation) => ({
        ...formValidation,
        errordescription: <Error msg="Recipe Description is required" />,
      }));
      setTimeout(
        () =>
          setFormValidation((formValidation) => ({
            ...formValidation,
            errordescription: null,
          })),
        2000
      );
      return;
    }
    if (!formData.previewImage) {
      setFormValidation((formValidation) => ({
        ...formValidation,
        errorpreviewImage: <Error msg="You have to Upload Image" />,
      }));
      setTimeout(
        () =>
          setFormValidation((formValidation) => ({
            ...formValidation,
            errorpreviewImage: null,
          })),
        2000
      );
      return;
    }
    if (formData.ingredientsNum === 0) {
      setFormValidation((formValidation) => ({
        ...formValidation,
        erroringredientsNum: <Error msg="Put some ingredients" />,
      }));
      setTimeout(
        () =>
          setFormValidation((formValidation) => ({
            ...formValidation,
            erroringredientsNum: null,
          })),
        2000
      );
      return;
    }

    if (formData.ingredientsNum > 0) {
      const data = formData.ingredients.filter(
        (ele) => ele.value === "" || ele.ingredient === ""
      );
      if (data.length !== 0) {
        setFormValidation((formValidation) => ({
          ...formValidation,
          erroringredients: <Error msg="You have to mention all ingredients" />,
        }));
        setTimeout(
          () =>
            setFormValidation((formValidation) => ({
              ...formValidation,
              erroringredients: null,
            })),
          2000
        );
        return;
      }
    }
    setBtnInfo(<Loader />);

    // dispatch(
    //   addRecipeData({ ...formData, recipeImage: null, previewImage: null })
    // );
    dispatch(
      updateRecipeData({
        recipeName,
        myRecipe: { ...formData, recipeImage: null, previewImage: null },
      })
    );

    setBtnInfo("Recipe added");

    setTimeout(() => {
      setBtnInfo("Add Recipe");
    }, 2000);
    setFormData({
      recipeName: "",
      description: "",
      recipeImage: null,
      previewImage: null,
      ingredientsNum: 0,
      ingredients: [],
    });
  };

  const handleFileUpload = (e) => {
    const recipeImage = e.target.files[0];
    if (!recipeImage) return;
    setFormData((formData) => ({
      ...formData,
      recipeImage,
    }));
    const reader = new FileReader();
    reader.readAsDataURL(recipeImage);
    reader.addEventListener("load", () => {
      setFormData((formData) => ({
        ...formData,
        previewImage: (
          <PreviewImage
            src={reader.result}
            handleDeleteImage={handleDeleteImage}
          />
        ),
        recipeImgSrc: reader.result,
      }));
    });
  };

  return (
    <>
      <div className="flex-grow text-center">
        <h1 className="heading">Edit Recipe</h1>
        <form action="#" className="form-width-2">
          <div className="form-transitions flex-center flex-col align-start gap-y-1">
            <label htmlFor="recipe-name">Recipe Name</label>
            <input
              type="text"
              placeholder="Recipe Name"
              id="recipe-name"
              value={formData.recipeName}
              onChange={handleChange}
              name="recipeName"
              disabled
            />
            {formValidation.errorrecipeName}
          </div>
          <div className="form-transitions flex-center flex-col align-start gap-y-1">
            <label htmlFor="desc">Description</label>
            <input
              type="text"
              placeholder="Description"
              id="desc"
              value={formData.description}
              onChange={handleChange}
              name="description"
            />
            {formValidation.errordescription}
          </div>
          <div className="form-transitions flex-center flex-col align-start gap-y-1">
            <label htmlFor="desc">Upload Recipe Image</label>
            <input
              type="file"
              onChange={handleFileUpload}
              accept="image/png, image/jpeg"
              ref={imageFileRef}
              hidden
            />
            <div
              onClick={() => imageFileRef.current.click()}
              className="upload-icon"
            >
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            {formData.recipeImage && !formData.previewImage && (
              <span className="loader inline-block m-y-3"></span>
            )}
            {formData.previewImage}
            {formValidation.errorpreviewImage}
          </div>
          <div className="form-transitions flex-center flex-col align-start gap-y-1">
            <label htmlFor="ingredients">Number of Ingredients</label>
            <input
              type="number"
              placeholder="Number of ingredients"
              id="ingredients"
              value={formData.ingredientsNum}
              onChange={handleChangeIngredient}
              name="ingredientsNum"
            />
            {formValidation.erroringredientsNum}
          </div>
          {formData?.ingredients?.map((ele) => (
            <div
              key={ele.id}
              className="form-transitions flex-center flex-col align-start gap-y-1"
            >
              <label>Ingredient - {ele.id + 1}</label>
              <div className="flex-center gap-3">
                <input
                  type="text"
                  placeholder="Ingredient Name"
                  value={ele.ingredient}
                  onChange={handleChangeIngredientData1}
                  name={ele.id}
                  required
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={ele.value}
                  onChange={handleChangeIngredientData2}
                  name={ele.id}
                  required
                />
              </div>
            </div>
          ))}
          {formValidation.erroringredients}
          <button className="input-btn" onClick={handleSubmit}>
            {btnInfo}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditRecipe;
