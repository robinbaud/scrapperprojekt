<form action="{{ route('users.store')}}" method="POST">
@csrf
<input type="text" placeholder="nom" name="name">
<input type="email" placeholder="mail" name="email">
<input type="password" name="password">
<button type="submit">enregistrer</button>
</form>
