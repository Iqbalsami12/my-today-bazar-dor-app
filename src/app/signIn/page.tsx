import React from 'react';

const SignInPage = () => {
    return (
        <div className='flex justify-center mt-10 '>
            <form className=''>
  <legend className="text-center text-3xl font-bold">সাইন ইন</legend>
  <p className="mt-2 5 text-gray-600 text-sm text-center">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
                <fieldset className="fieldset  border-base-300 rounded-box w-xs border p-4 bg-white mt-4">

  <label className="label text-black text-xl">ইমেইল</label>
  <input type="email" className="input" placeholder="you@example.com" />

  <label className="label text-xl text-black">পাসওয়ার্ড</label>
  <input type="password" className="input" placeholder="কমপক্ষে ৮ অক্ষর" />

  <button className="btn btn-neutral mt-4 text-white bg-green-600 border-none">সাইন ইন</button>
</fieldset>
            </form>
        </div>
    );
};

export default SignInPage;