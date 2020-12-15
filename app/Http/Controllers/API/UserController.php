<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     * */
       public function __construct()
    {
        $this->middleware('auth:api');
     
    }

     
    public function index()
    {   
        if (\Gate::allows('isAdmin') || \Gate::allows('isAuthor')) {
            return User::latest()->paginate(30);
        }
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       // $this->validate($request,[
           //'name' =>'required|string|max:191',
            //'email' =>'required|string|email|max:191|unique::users',
            //'password' =>'required|string|min:191'
            $validatedData = $request->validate([
                'name' =>'required|string|max:191',
                'email' => 'required|string|email|max:191',
                'password'=>'required|string|min:6', 
            ]);  
      
        return User::create([
            'name'=>$request['name'],
            'email'=>$request['email'],
            'type'=>$request['type'],
            'bio'=>$request['bio'],
            'photo'=>$request['photo'],
            'password'=>Hash::make($request['password']),
        ]);  
           
        //return back()->with('success', 'User created successfully.'); 
//return $request->all();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    public function profile($id)
    {
        return auth('api')->user();
      //
    }
    public function updateProfile(Request $request)
    {     $user = User::findOrFail($id);
        $user= auth('api')->user();
        $validatedData = $request->validate([
           // 'name' =>'required|string|max:191',
            'email' => 'required|string|email|max:191,email',//.$user->id,
            'password'=>'sometimes|required|string|min:6',  
        ]);  
        $currentPhoto=$user->photo;   
        if($request->photo !=  $currentPhoto ){
            $name = time().'.' . explode('/', explode(':', substr($request->photo, 0, strpos($request->photo, ';')))[1])[1];
          
            \Image::make($request->photo)->save(public_path('images/profile/').$name);
            $request->merge(['photo' => $name]);
          //Log::info($request->all());
          $userPhoto = public_path('img/profile/').$currentPhoto;
          if(file_exists($userPhoto)){
              @unlink($userPhoto);
        }
    }
        if(!empty($request->password)){
            $request->merge(['password' => Hash::make($request['password'])]);
        }
        //$user->save();
     $user->update($request->all());
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      $user=User::findOrFail($id);
      $validatedData = $request->validate([
        'name' =>'required|string|max:191',
        'email' => 'required|string|email|max:191,email',//.$user->id,
        'password'=>'sometimes|string|min:6', 
    ]); 
      $user-> update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->authorize('isAdmin');
        $user=User::findOrFail($id);
        $user->delete();
       //return ['message'=>'User deleted'];
    }
}
