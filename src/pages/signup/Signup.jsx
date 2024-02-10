  import Google from '../../assets/images/icons/google.png';
  import FbIcon from '../../assets/images/icons/fb.svg';
  import Smiley1 from '../../assets/images/icons/smileys/smiley-1.gif';
  import Smiley2 from '../../assets/images/icons/smileys/smiley-2.gif';
  import Smiley3 from '../../assets/images/icons/smileys/smiley-3.gif';
  import Smiley4 from '../../assets/images/icons/smileys/smiley-4.gif';
  import Smiley5 from '../../assets/images/icons/smileys/smiley-5.gif';
  import Smiley6 from '../../assets/images/icons/smileys/smiley-6.gif';
  import Smiley7 from '../../assets/images/icons/smileys/smiley-7.gif';
  import Smiley8 from '../../assets/images/icons/smileys/smiley-8.gif';
  import Smiley9 from '../../assets/images/icons/smileys/smiley-9.gif';
  import { useForm} from "react-hook-form"
  import { yupResolver } from "@hookform/resolvers/yup"
  import * as yup from "yup"
  import { CircularProgressbar } from 'react-circular-progressbar';
  import 'react-circular-progressbar/dist/styles.css';
  import { useEffect, useState } from 'react';
  const SmileyImages = {
    "Smiley1":Smiley1,
    "Smiley2":Smiley2,
    "Smiley3":Smiley3,
    "Smiley4":Smiley4,
    "Smiley5":Smiley5,
    "Smiley6":Smiley6,
    "Smiley7":Smiley7,
    "Smiley8":Smiley8,
    "Smiley9":Smiley9,
  }
  const schema = yup
    .object({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      email: yup.string().email('Invalid email address').required('Email is required'),
      phone: yup
        .string()
        .required('Phone number is required')
        .matches(/^\d+$/, 'Phone number must contain only numeric digits')
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number must be at most 15 digits'),
      password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .test('is-strong-password', 'Invalid password', function (value) {
          const criteria = ['one lowercase letter', 'one uppercase letter','one number','one special character'];
    
          if (/[a-z]/.test(value)) criteria.splice(criteria.indexOf('one lowercase letter'), 1);
          if (/[A-Z]/.test(value)) criteria.splice(criteria.indexOf('one uppercase letter'), 1);
          if (/\d/.test(value)) criteria.splice(criteria.indexOf('one number'), 1);
          if (/[@#$!%*?&]/.test(value)) criteria.splice(criteria.indexOf('special character'), 1);
    
          return criteria.length === 0 || new yup.ValidationError(`Password must contain at least ${criteria.join(', ')}`, value, 'password');
        })
        // .matches(
        //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        //   'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        // )
    })
    .required()

  const Signup = () => {
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isValid },
    } = useForm({
      resolver: yupResolver(schema),
      mode:"onChange"
    })


  //   const handleKeyPress = (e) => {
  //     // Allow only numeric digits (0-9)
  //     if (!/\d/.test(e.key)) {
  //       e.preventDefault();
  //     }
  //   };

    const onSubmit = (data) => console.log(data)
    const watchPwd = watch("password");

    function calculatePasswordStrength(password, hasErrors) {
      if (!password) {
        return 0; // Hidden
      } else if (password.length < 4) {
        return 16;
      } else if (password.length < 8) {
        return 33;
      } else if (hasErrors) {
        return 66;
      } else {
        return 100;
      }
    }
    
    function getPasswordStrengthColor(password, hasErrors) {
      if (!password || password?.length < 8) {
        return 'red';
      } else if (hasErrors) {
        return 'orange';
      } else {
        return 'green';
      }
    }
    const [specialChar, setSpecialChar] = useState(0);
    const [currentSmiley, setCurrentSmiley] = useState("Smiley1");


    useEffect(() => {
      const getSpecialCharLength = (watchPwd) => {
        // Reset the specialChar count before checking again
        setSpecialChar(0);
  
        if (/[a-z]/.test(watchPwd)) {
          setSpecialChar((prev) => prev + 1);
        }
  
        if (/[A-Z]/.test(watchPwd)) {
          setSpecialChar((prev) => prev + 1);
        }
  
        if (/\d/.test(watchPwd)) {
          setSpecialChar((prev) => prev + 1);
        }
  
        if (/[@#$!%*?&]/.test(watchPwd)) {
          setSpecialChar((prev) => prev + 1);
        }
      };
  
      const getNewSmileys = (watchPwd) => {
        if (watchPwd) {
          if (watchPwd.length < 8) {
            if (specialChar <= 2) {
              return 'Smiley1';
            }
            else if (specialChar >= 3) {
              return 'Smiley5';
            }
            else{
              return 'Smiley1';
            }
            
          } 
          else if(watchPwd.length >= 8){
            if (specialChar <= 1 && watchPwd.length <= 10) {
              return 'Smiley2';
            }
            else if (specialChar <= 1 && watchPwd.length <= 14 && watchPwd.length > 10) {
              return 'Smiley3';
            }
            else if (specialChar <= 1 && watchPwd.length > 14) {
              return 'Smiley6';
            }
            else if (specialChar === 2 && watchPwd.length <= 10) {
              return 'Smiley4';
            }
            else if (specialChar === 2 && watchPwd.length <= 13 && watchPwd.length > 10) {
              return 'Smiley3';
            }
            else if (specialChar === 2 && watchPwd.length > 14) {
              return 'Smiley6';
            }
            else if (specialChar === 3 && watchPwd.length <= 10) {
              return 'Smiley7';
            }
            else if (specialChar === 3 && watchPwd.length <= 13 && watchPwd.length > 10) {
              return 'Smiley3';
            }
            else if (specialChar === 3 && watchPwd.length >= 14 && watchPwd.length < 16) {
              return 'Smiley4';
            }
            else if (specialChar === 3 && watchPwd.length >= 16) {
              return 'Smiley6';
            }
            else if (specialChar === 4 && watchPwd.length <= 10) {
              return 'Smiley8';
            }
            else if (specialChar === 4 && watchPwd.length >= 11) {
              return 'Smiley9';
            }
            else{
              return 'Smiley2';
            }
          }
          else {
            return 'smiley-1';
          }
        }
      };
  
      const getSuitableSmileys = (watchPwd) => {
        getSpecialCharLength(watchPwd);
        const newSmileys = getNewSmileys(watchPwd);
        setCurrentSmiley(newSmileys);
      };
  
      getSuitableSmileys(watchPwd);
    }, [watchPwd, errors.password, specialChar]);

      return (
        <div className="w-full max-w-[520px] float-right p-10 bg-white rounded-xl border border-[#EDEDED]">
            <div className="w-full float-left flex flex-col">
                <p className="text-[22px] text-[#666666] font-familty-semibold">Start your free trial {currentSmiley}</p>
                <span className="text-base text-[#888888] font-familty-medium">Get started with a demo account on Wati</span>
            </div>
            <div className="w-full float-left flex gap-x-4 mt-6">
                <button type="button" className="flex w-1/2 justify-center items-center gap-x-1 rounded-md py-2.5 px-2 font-familty-medium text-sm border border-[#EDEDED] bg-[#F8F8F8] text-[#777777]">
                    <img src={Google} alt="Google"/><span>Sign up with google</span>
                </button>
                <button type="button" className="flex w-1/2 justify-center items-center gap-x-1 rounded-md py-2.5 px-2 font-familty-medium text-sm border border-[#EDEDED] bg-[#F8F8F8] text-[#777777]">
                    <img src={FbIcon} alt="Google"/><span>Sign up with facebook</span>
                </button>
            </div>
            <div className="w-full float-left mt-6">
                <p className="text-sm font-familty-medium text-[#777777]">Or sign up with e-mail</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full float-left mt-6">
                <div className="w-full float-left grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-y-1">
                        <label className="text-sm font-familty-medium text-[#444444]">First name</label>
                        <input {...register("firstName")} type="text" placeholder="First Name" className="w-full h-[52px] p-3 border border-[#EDEDED] focus:outline-none rounded-lg placeholder:text-[#888888] text-[#444444] text-sm"/>
                        {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName?.message}</p>}
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <label className="text-sm font-familty-medium text-[#444444]">Last name</label>
                        <input {...register("lastName")} type="text" placeholder="Last Name" className="w-full h-[52px] p-3 border border-[#EDEDED] focus:outline-none rounded-lg placeholder:text-[#888888] text-[#444444] text-sm"/>
                        {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName?.message}</p>}
                    </div>
                    <div className="flex flex-col gap-y-1 col-span-2">
                        <label className="text-sm font-familty-medium text-[#444444]">Business e-mail</label>
                        <input {...register("email")}  type="text" placeholder="Your business e-mail" className="w-full h-[52px] p-3 border border-[#EDEDED] focus:outline-none rounded-lg placeholder:text-[#888888] text-[#444444] text-sm"/>
                        {errors.email && <p className="text-red-600 text-sm">{errors.email?.message}</p>}
                    </div>
                    <div className="flex flex-col gap-y-1 col-span-2">
                        <label className="text-sm font-familty-medium text-[#444444]">Password</label>
                        <div className="w-full relative">
                            <input {...register("password")} type="password" placeholder="Password" className="w-full h-[52px] p-3 pr-16 border border-[#EDEDED] focus:outline-none rounded-lg placeholder:text-[#888888] text-[#444444] text-sm"/>
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10">
                                <div className="w-full h-full float-left relatives">
                                  <CircularProgressbar 
                                    value={calculatePasswordStrength(watchPwd, errors.password)}
                                    styles={{
                                        path: {
                                          stroke: getPasswordStrengthColor(watchPwd, errors.password),
                                        }
                                      }}
                                  />
                                  {watchPwd && (
                                    <img
                                      src={SmileyImages[currentSmiley]}
                                      className="w-8 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
                                      alt=""
                                    />
                                  )}
                                </div>
                            </div>
                        </div>
                        {errors.password && <p className="text-red-600 text-sm">{errors.password?.message}</p>}
                    </div>
                    <div className="flex flex-col gap-y-1 col-span-2">
                        <label className="text-sm font-familty-medium text-[#444444]">Phone Number</label>
                        <input {...register("phone")} type="text" placeholder="Phone Number" className="w-full h-[52px] p-3 border border-[#EDEDED] focus:outline-none rounded-lg placeholder:text-[#888888] text-[#444444] text-sm"/>
                        {errors.phone && <p className="text-red-600 text-sm">{errors.phone?.message}</p>}
                    </div>
                </div>
                <div className="w-full float-left mt-6">
                    <p className="w-full float-left text-sm font-familty-medium">By signing up you agree to the <a href="#" className="text-[#23A455] underline">Terms</a> and <a href="#" className="text-[#23A455] underline">Privacy Policy</a></p>
                    <button disabled={!isValid} type="submit" className="w-full px-2 py-2 h-[52px] rounded-lg mt-2 text-white text-xl font-familty-medium bg-[#23A455] disabled:cursor-not-allowed disabled:bg-gray-300 focus:outline-none hover:bg-opacity-80">Start my trial</button>
                    <p className="w-full float-left text-sm font-familty-medium mt-4">Already have an account? <a href="#" className="text-[#23A455] underline">Sign in</a></p>
                </div>
            </form>
        </div>
      )
  }

  export default Signup;