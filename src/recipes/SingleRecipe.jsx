import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { Badge, List, Button } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUtensils, faClock, faFire, faCheck, faHeart, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const SingleRecipe = () => {
    const recipe = useLoaderData();

    if (!recipe) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-50 text-center">
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Recipe Not Found</h2>
                    <p className="text-slate-500 mb-8">This culinary inspiration seem to have been misplaced.</p>
                    <Link to="/recipe">
                        <Button color="indigo" pill size="xl" className="px-8 font-black mx-auto">Back to Recipes</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const { title, description, imageURL, ingredients, steps, category } = recipe;

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Navigation and Title */}
                <div className="mb-12 space-y-6">
                   <Link to="/recipe" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-all group">
                        <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Recipes
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4">
                            <Badge color="indigo" size="lg" className="w-fit px-4 py-1.5 font-black uppercase tracking-widest rounded-xl">
                                {category || 'Gourmet'}
                            </Badge>
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight max-w-3xl">
                                {title}
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                             <div className="flex items-center gap-6 bg-white px-8 py-4 rounded-[2rem] shadow-lg border border-slate-50">
                                <div className="text-center">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time</p>
                                    <p className="text-lg font-black text-slate-900">45m</p>
                                </div>
                                <div className="w-px h-8 bg-slate-100"></div>
                                <div className="text-center">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Yield</p>
                                    <p className="text-lg font-black text-slate-900">4 Servings</p>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Side: Image & Ingredients */}
                    <div className="lg:col-span-1 space-y-12">
                        <div className="aspect-[3/4] rounded-[3.5rem] overflow-hidden shadow-2xl relative group">
                            <img 
                                src={imageURL || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80'} 
                                alt={title} 
                                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>

                        <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-50">
                            <h3 className="text-2xl font-black text-slate-900 mb-8 border-b border-slate-50 pb-6 flex items-center justify-between">
                                Ingredients
                                <FontAwesomeIcon icon={faUtensils} className="text-indigo-400 text-sm" />
                            </h3>
                            <ul className="space-y-4">
                                {ingredients.map((ingredient, index) => (
                                    <li key={index} className="flex items-start gap-3 group">
                                        <div className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-indigo-600 transition-colors">
                                            <FontAwesomeIcon icon={faCheck} className="text-[10px] text-indigo-400 group-hover:text-white" />
                                        </div>
                                        <span className="text-slate-600 font-medium leading-relaxed">{ingredient}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Side: Description & Steps */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl shadow-slate-200/60 border border-slate-50 space-y-10">
                            <div className="space-y-6">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">The Experience</h3>
                                <p className="text-xl md:text-2xl font-medium text-slate-600 leading-relaxed italic border-l-8 border-indigo-600 pl-8 py-2">
                                    "{description || 'Discover a harmony of flavors with this masterfully crafted dish, designed to bring the gourmet experience to your dining table.'}"
                                </p>
                            </div>

                            <div className="space-y-10">
                                <h3 className="text-2xl font-black text-slate-900 border-b border-slate-50 pb-6">Preparation Steps</h3>
                                <div className="space-y-10">
                                    {steps.map((step, index) => (
                                        <div key={index} className="flex gap-8 group">
                                            <div className="flex flex-col items-center">
                                                <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl italic shadow-xl group-hover:bg-indigo-600 transition-colors duration-500">
                                                    {index + 1}
                                                </div>
                                                <div className="w-1 flex-1 bg-slate-100 rounded-full mt-4 group-last:hidden"></div>
                                            </div>
                                            <div className="flex-1 pt-3">
                                                <p className="text-lg font-medium text-slate-600 leading-relaxed pb-8">
                                                    {step}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-indigo-600 rounded-[3rem] p-12 text-white text-center space-y-6 shadow-2xl shadow-indigo-200">
                            <h3 className="text-3xl font-black">Find these ingredients in our shop?</h3>
                            <p className="text-indigo-100 font-medium max-w-xl mx-auto leading-relaxed text-lg pb-4">
                                All our recipes are crafted using the premium products available right here in the Shenthuri Shop collection.
                            </p>
                            <Link to="/shop">
                                <Button color="white" size="xl" pill className="font-black px-12 py-3 mx-auto shadow-xl">
                                    Shop the Essentials <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleRecipe;