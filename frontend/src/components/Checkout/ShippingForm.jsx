import {
    User,
    Phone,
    MapPin,
    Building,
    Map,
    MapPinned,
} from "lucide-react";

export default function ShippingForm({
    shipping,
    handleChange,
}) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

            <h2 className="mb-6 text-2xl font-bold text-slate-800">
                Shipping Address
            </h2>

            <div className="grid gap-6">

                {/* Full Name */}

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Full Name
                    </label>

                    <div className="relative">
                        <User
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            name="fullName"
                            value={shipping.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>
                </div>

                {/* Phone */}

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Phone Number
                    </label>

                    <div className="relative">
                        <Phone
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="tel"
                            name="phone"
                            value={shipping.phone}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");

                                if (value.length <= 10) {
                                    handleChange({
                                        target: {
                                            name: "phone",
                                            value: value,
                                        },
                                    });
                                }
                            }}
                            maxLength={10}
                            inputMode="numeric"
                            placeholder="9876543210"
                            className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>
                </div>

                {/* Address */}

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Address
                    </label>

                    <div className="relative">

                        <MapPin
                            size={18}
                            className="absolute left-4 top-5 text-slate-400"
                        />

                        <textarea
                            rows={4}
                            name="address"
                            value={shipping.address}
                            onChange={handleChange}
                            placeholder="123, MG Road"
                            className="w-full resize-none rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>
                </div>

                {/* City + State */}

                <div className="grid gap-6 md:grid-cols-2">

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            City
                        </label>

                        <div className="relative">
                            <Building
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                name="city"
                                value={shipping.city}
                                onChange={handleChange}
                                placeholder="Ahmedabad"
                                className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            State
                        </label>

                        <div className="relative">
                            <Map
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                name="state"
                                value={shipping.state}
                                onChange={handleChange}
                                placeholder="Gujarat"
                                className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            />
                        </div>
                    </div>

                </div>

                {/* Pincode */}

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Pincode
                    </label>

                    <div className="relative">
                        <MapPinned
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            type="text"
                            name="pincode"
                            value={shipping.pincode}
                            onChange={handleChange}
                            placeholder="380001"
                            className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>
                </div>

            </div>

        </div>
    );
}