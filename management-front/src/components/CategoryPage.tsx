import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useGet } from '../hooks'
import { Category } from '../model';
import CategoryForm from './CategoryForm';
import axios from 'axios';


export default function CategoryPage() {
    const { data: categories, loading, setData: setCategories } = useGet<Category>('/api/categories');
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined)
    if (loading) {
        return null;
    }
    return (
        <div className='px-5'>
            <Header center content='Categories' />
            <div className='row'>
                <div className='col-8'>
                    <table className='table'>
                        <thead>
                            <th>ID</th>
                            <th>Name</th>
                        </thead>
                        <tbody>
                            {
                                categories.map(category => {
                                    return (
                                        <tr className={selectedCategory === category ? "table-active" : ''}
                                            onClick={() => {
                                                setSelectedCategory(prev => {
                                                    if (prev === category) {
                                                        return undefined;  
                                                    }
                                                    return category; 
                                                })
                                            }}
                                            key={category.id}>
                                            <td>{category.id}</td>
                                            <td>{category.name}</td>
                                            
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className='col-4'>
                    <CategoryForm
                        category={selectedCategory}
                        onSubmit={async (val) => {
                            if (!selectedCategory) {
                                const res = await axios.post('/api/addcategory', val);
                                const category = res.data.data;
                                setCategories(prev => [...prev, category]);
                                return;
                            }
                            const res = await axios.post('/api/updatecategory/' + selectedCategory.id, val);
                            const category = res.data.data;
                            setCategories(prev => {
                                return prev.map(val => {
                                    if (val === selectedCategory) {
                                        return category
                                    }
                                    return val;
                                })
                            })
                            setSelectedCategory(undefined);
                        }}
                    />
                </div>
            </div>
        </div>
    )
   
}