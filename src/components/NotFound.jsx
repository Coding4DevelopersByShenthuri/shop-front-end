import React from 'react';
import { Button, Card, Badge } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
            <div className="max-w-2xl w-full text-center space-y-8">
                <div className="relative">
                    <h1 className="text-[12rem] font-black text-indigo-600/10 leading-none select-none">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white p-8 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-50">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="text-6xl text-amber-400 mb-6" />
                            <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Page Not Found</h2>
                            <p className="text-slate-500 font-medium">The requested destination does not exist in our grocery world.</p>
                        </div>
                    </div>
                </div>

                <div className="pt-12">
                    <Link to="/">
                        <Button size="xl" className="mx-auto bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-black py-4 px-8 shadow-xl shadow-indigo-100 transition-all active:scale-95">
                            <span className="flex items-center gap-3">
                                Return to Marketplace <FontAwesomeIcon icon={faHome} />
                            </span>
                        </Button>
                    </Link>
                </div>
                
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest pt-8">
                    Shenthuri Shop &bull; Premium Quality Daily
                </p>
            </div>
        </div>
    );
};

export default NotFound;
