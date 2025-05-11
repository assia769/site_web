<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
        }
        .register-container {
            max-width: 450px;
            margin: 50px auto;
            padding: 25px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
        }
        .register-header {
            text-align: center;
            margin-bottom: 25px;
        }
        .btn-primary {
            width: 100%;
            padding: 10px;
            background-color: #4a6fdc;
            border: none;
        }
        .btn-primary:hover {
            background-color: #3a5bba;
        }
        .login-link {
            text-align: center;
            margin-top: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="register-container">
            <div class="register-header">
                <h2>Inscription</h2>
                <p>Créez votre compte pour commencer</p>
            </div>
            
            @if(session('error'))
                <div class="alert alert-danger">
                    {{ session('error') }}
                </div>
            @endif
            
            <form method="POST" action="{{ url('api/register') }}">
                @csrf
                
                <div class="mb-3">
                    <label for="username_u" class="form-label">Nom complet</label>
                    <input type="text" class="form-control @error('username_u') is-invalid @enderror" id="username_u" name="username_u" value="{{ old('username_u') }}" required autofocus>
                    @error('username_u')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                
                <div class="mb-3">
                    <label for="email" class="form-label">Adresse email</label>
                    <input type="email" class="form-control @error('email') is-invalid @enderror" id="email" name="email" value="{{ old('email') }}" required>
                    @error('email')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                
                <div class="mb-3">
                    <label for="password_u" class="form-label">Mot de passe</label>
                    <input type="password" class="form-control @error('password_u') is-invalid @enderror" id="password_u" name="password_u" required>
                    @error('password_u')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                
                <div class="mb-3">
                    <label for="password_u_confirmation" class="form-label">Confirmer le mot de passe</label>
                    <input type="password" class="form-control" id="password_u_confirmation" name="password_u_confirmation" required>
                </div>
                
                <div class="mb-3">
                    <label for="birthday_u" class="form-label">Date de naissance</label>
                    <input type="date" class="form-control @error('birthday_u') is-invalid @enderror" id="birthday_u" name="birthday_u" value="{{ old('birthday_u') }}">
                    @error('birthday_u')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                
                <button type="submit" class="btn btn-primary">S'inscrire</button>
            </form>
            
            <div class="login-link">
                <p>Vous avez déjà un compte? <a href="{{ url('/login') }}">Se connecter</a></p>
            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>