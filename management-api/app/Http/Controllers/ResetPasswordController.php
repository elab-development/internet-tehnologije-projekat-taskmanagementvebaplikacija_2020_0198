<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ResetPasswordController extends Controller
{
    public function reset(Request $request)
{
    $this->validateReset($request);

    $resetPassword = DB::table('password_reset_tokens')
                        ->where('email', $request->email)
                        ->where('token', $request->token)
                        ->first();

    if (!$resetPassword) {
        return response()->json(['message' => 'Neispravan token za resetovanje lozinke.'], 404);
    }

    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json(['message' => 'Korisnik sa ovom email adresom nije pronađen.'], 404);
    }

    // Ažuriranje lozinke korisnika
    $user->password = bcrypt($request->password);
    $user->save();

    // Brišemo token za resetovanje lozinke iz baze
    DB::table('password_reset_tokens')->where('email', $request->email)->delete();

    return response()->json(['message' => 'Lozinka uspešno resetovana.']);
}
}
