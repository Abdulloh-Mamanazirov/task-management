import React from 'react'

const ThreePage = () => {
    return (
        <div className='mt-5'>
            <table className="table-auto w-full border">
                <tbody>
                    <tr>
                        <td className="border px-4 py-2 text-blue-500">Row 1, Cell 1</td>
                        <td className="border px-4 py-2 text-lime-400">Row 1, Cell 2</td>
                        <td className="border px-4 py-2 text-red-500">Row 1, Cell 3</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2 text-blue-500">Row 2, Cell 1</td>
                        <td className="border px-4 py-2 text-lime-400">Row 2, Cell 2</td>
                        <td className="border px-4 py-2 text-red-500">Row 2, Cell 3</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ThreePage