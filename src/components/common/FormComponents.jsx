import React from 'react';

export const FormField = ({ label, children, className="", required=false }) => (
    <div className={`flex flex-col gap-1 ${className}`}>
        <label className="text-sm font-semibold text-gray-700">{label} {required && <span className="text-red-500">*</span>}</label>
        {children}
    </div>
);

export const Input = ({...props}) => <input {...props} className="border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none w-full" />;

export const Select = (props) => <select {...props} className="border rounded-lg p-2 text-sm bg-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none w-full">{props.children}</select>;