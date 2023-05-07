<h1>binsoir</h1>

<form action="{{ route('login.store')}}" method="POST">
    @csrf

    <input type="email" placeholder="mail" name="email">
    <input type="password" name="password">
    <button type="submit">enregistrer</button>
    </form>
