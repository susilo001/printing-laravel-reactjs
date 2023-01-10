<?php

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Cart\CartController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'categories' => Category::with('products')->get(),
        'featuredProducts' => Product::with(['category', 'prices'])->where('featured', true)->get(),
        'laravelVersion' => Application::VERSION,
    ]);
});

Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::controller(CartController::class)->group(function () {
        Route::get('/cart', 'index')->name('cart.index');
        Route::post('/cart', 'store')->name('cart.store');
        Route::put('/cart', 'update')->name('cart.update');
        Route::delete('/cart/{rowId}', 'destroy')->name('cart.destroy');
    });
});

Route::get('/product/{product}', [ProductController::class, 'show'])->name('product.show');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/design', function () {
    return Inertia::render('Design');
})->middleware(['auth', 'verified'])->name('design');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
