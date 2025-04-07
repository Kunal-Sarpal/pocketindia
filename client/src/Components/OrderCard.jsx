import { CheckCircle, Clock, Plane, ChevronUp } from 'lucide-react';

const OrderCard = () => {
    return (
        <div className="bg-white rounded border max-w-2xl mx-auto mt-10 p-6 space-y-6 text-gray-800">
            {/* Header */}
            <div className="border-b pb-4">
                <p className="text-blue-700 font-semibold text-sm">LN448994457CN</p>
                <h2 className="text-md font-bold mt-1">📦 Order from pocketIndia</h2>
                <p className="text-sm text-blue-600 mt-1">
                    WS 858 bluetooth karaoke microphone wireless professional speaker condenser handheld microphone radio mikrofon studio record mic
                </p>
            </div>

            {/* Order Info */}
            <div className="text-sm border-b pb-4">
                <button className="text-gray-500 flex items-center gap-1 mb-2">
                    <ChevronUp size={14} />
                    Hide Information
                </button>
                <div className="flex justify-between">
                    <p><span className="font-medium">Weight:</span> 427 g.</p>
                    <p><span className="font-medium">Type:</span> Simple departure</p>
                </div>
                <div className="flex justify-between mt-1">
                    <p><span className="font-medium">Recipient address:</span> USA</p>
                    <p><span className="font-medium">Recipient:</span> Johnny</p>
                </div>
            </div>

            {/* Couriers */}
            <div className="flex items-center gap-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md font-medium">China Post</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md font-medium">USPS</span>
            </div>

            {/* Delivery Timeline */}
            <div className="bg-gray-100 p-4 rounded-xl mt-2">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-600">Delivered in 20 days</p>
                    <Plane className="text-blue-500 "  size={20} />
                </div>

                <div className="border-l-2 border-gray-300 pl-4 space-y-4 relative">
                    <div className="absolute bg-white rounded-full left-[-9px] top-0 text-green-500">
                        <CheckCircle size={18} />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">29 August 15:23 - Delivered</p>
                        <p className="text-sm text-gray-500">NEW CASTLE, DE 19720 (USPS)</p>
                    </div>

                    <div className="absolute bg-white rounded-full left-[-9px] top-[60px] text-yellow-500">
                        <Clock size={18} />
                    </div>
                    <div>
                        <p className="font-medium">28 August 18:42 - Arrived at Unit</p>
                        <p className="text-sm text-gray-500">NEW CASTLE, DE 19720 (USPS)</p>
                    </div>

                    <div className="absolute bg-white rounded-full left-[-9px] top-[120px] text-green-700">
                        <CheckCircle size={18} />
                    </div>
                    <div>
                        <p className="font-medium">28 August 18:42 - Arrived at the delivery point</p>
                        <p className="text-sm text-gray-500">USA (China Post)</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
