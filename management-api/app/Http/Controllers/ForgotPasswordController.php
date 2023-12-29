<?php

namespace App\Http\Controllers;

use App\Mail\ResetPassword;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class ForgotPasswordController extends Controller
{
    public function sendResetLink(Request $request) {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Korisnik sa ovom email adresom nije pronađen u bazi.'], 404);
        }

        $token = Password::createToken($user);

        // Logika za slanje emaila sa linkom za resetovanje lozinke
        // Primer:
        Mail::to($user->email)->send(new ResetPassword($user, $token));

        return response()->json(['message' => 'Email sa linkom za resetovanje lozinke poslat.']);
    }
}
