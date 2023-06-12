import React, { useState, useEffect } from 'react'
import { useTable } from 'react-table'
import { db } from '../utils/firebase'

const ProductManager = () => {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = await db.collection('products').get()
        const productsList = productsCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setProducts(productsList)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  const handleAddProduct = async (e) => {
    e.preventDefault()

    try {
      const newProduct = {
        name: productName,
        price: productPrice,
        description: productDescription,
      }

      await db.collection('products').add(newProduct)

      setProducts((prevProducts) => [...prevProducts, newProduct])

      setProductName('')
      setProductPrice('')
      setProductDescription('')
      setShowForm(false)
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: products,
  })

  return (
    <div>
      {showForm && (
        <div className="bottom-0·left-0·right-0·top-0 fixed z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="mx-auto max-w-sm rounded-md bg-white p-4 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Add Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="rounded-md bg-indigo-500 px-4 py-2 text-white">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex">
        <div className="flex-1">
          <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      key={column.id}
                      {...column.getHeaderProps()}
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="divide-y divide-gray-200 bg-white">
              {rows.map((row) => {
                prepareRow(row)
                return (
                  <tr key={row.id} {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        key={cell.id}
                        {...cell.getCellProps()}
                        className="whitespace-nowrap px-6 py-4"
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <button
          className="bottom-8·right-8 fixed flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg"
          onClick={() => setShowForm((prevShowForm) => !prevShowForm)}
        >
          {showForm ? '-' : '+'}
        </button>
      </div>
    </div>
  )
}

export default ProductManager
