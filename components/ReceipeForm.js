import React, { useState, useEffect } from 'react'
import { db } from '../utils/firebase'

const RecipeForm = ({
  selectedProduct,
  setSelectedProduct,
  products,
  setProducts,
  selectedRecipe,
  setSelectedRecipe,
}) => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [steps, setSteps] = useState([''])
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }])
  const [productId, setProductId] = useState('')

  const handleStepsChange = (index, event) => {
    const newSteps = [...steps]
    newSteps[index] = event.target.value
    setSteps(newSteps)
  }

  const handleIngredientsChange = (index, event) => {
    const newIngredients = [...ingredients]
    newIngredients[index][event.target.name] = event.target.value
    setIngredients(newIngredients)
  }

  const handleAddStep = () => {
    setSteps((prevSteps) => [...prevSteps, ''])
  }

  const handleAddIngredient = () => {
    setIngredients((prevIngredients) => [...prevIngredients, { name: '', quantity: '' }])
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = await db.collection('products').get()
      setProducts(productsCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    }

    fetchProducts()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (selectedRecipe) {
      // Logic for updating recipe
    } else {
      if (
        selectedProduct &&
        title &&
        image &&
        steps.length > 0 &&
        ingredients.length > 0 &&
        productId
      ) {
        try {
          await db.collection('recipes').add({
            title,
            image,
            steps,
            ingredients,
            productId,
          })

          setTitle('')
          setImage('')
          setSteps([''])
          setIngredients([{ name: '', quantity: '' }])
          setProductId('')
          setSelectedRecipe(null)
        } catch (error) {
          console.error('Error adding recipe:', error)
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Product</label>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>
      {steps.map((step, index) => (
        <div key={index}>
          <label className="block text-sm font-medium text-gray-700">Step {index + 1}</label>
          <input
            type="text"
            value={step}
            onChange={(event) => handleStepsChange(index, event)}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddStep}
        className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Add Step
      </button>
      {ingredients.map((ingredient, index) => (
        <div key={index} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ingredient {index + 1}
            </label>
            <input
              type="text"
              name="name"
              value={ingredient.name}
              onChange={(event) => handleIngredientsChange(index, event)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="text"
              name="quantity"
              value={ingredient.quantity}
              onChange={(event) => handleIngredientsChange(index, event)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddIngredient}
        className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Add Ingredient
      </button>
      <div>
        <label className="block text-sm font-medium text-gray-700">Product</label>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
      >
        Add Recipe
      </button>
    </form>
  )
}

export default RecipeForm
