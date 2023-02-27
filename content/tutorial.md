---
title: "Tutorial"
date: 2023-02-17T15:36:42-08:00
draft: false
weight: 2
---

# Tutorial

This tutorial provides a basic example of how to work with FlatBuffers. We will
step through a simple example application, which shows you how to:

- Write a FlatBuffer schema file.
- Use the flatc FlatBuffer compiler.
- Parse JSON files that conform to a schema into FlatBuffer binary files.
- Use the generated files in many of the supported languages (such as C++, Java,
  and more.)

During this example, imagine that you are creating a game where the main
character, the hero of the story, needs to slay some orcs. We will walk through
each step necessary to create this monster type using FlatBuffers.

## Writing the Monsters' FlatBuffer Schema

```
// Example IDL file for our monster's schema.

namespace MyGame.Sample;

enum Color:byte { Red = 0, Green, Blue = 2 }

union Equipment { Weapon } // Optionally add more tables.

struct Vec3 {
  x:float;
  y:float;
  z:float;
}

table Monster {
  pos:Vec3; // Struct.
  mana:short = 150;
  hp:short = 100;
  name:string;
  friendly:bool = false (deprecated);
  inventory:[ubyte];  // Vector of scalars.
  color:Color = Blue; // Enum.
  weapons:[Weapon];   // Vector of tables.
  equipped:Equipment; // Union.
  path:[Vec3];        // Vector of structs.
}

table Weapon {
  name:string;
  damage:short;
}

root_type Monster;
```

As you can see, the syntax for the schema Interface Definition Language (IDL) is
similar to those of the C family of languages, and other IDL languages. Let's
examine each part of this schema to determine what it does.

The schema starts with a namespace declaration. This determines the
corresponding package/namespace for the generated code. In our example, we have
the Sample namespace inside of the MyGame namespace.

Next, we have an enum definition. In this example, we have an enum of type byte,
named Color. We have three values in this enum: Red, Green, and Blue. We specify
Red = 0 and Blue = 2, but we do not specify an explicit value for Green. Since
the behavior of an enum is to increment if unspecified, Green will receive the
implicit value of 1.

Following the enum is a union. The union in this example is not very useful, as
it only contains the one table (named Weapon). If we had created multiple tables
that we would want the union to be able to reference, we could add more elements
to the union Equipment.

After the union comes a struct Vec3, which represents a floating point vector
with 3 dimensions. We use a struct here, over a table, because structs are ideal
for data structures that will not change, since they use less memory and have
faster lookup.

The Monster table is the main object in our FlatBuffer. This will be used as the
template to store our orc monster. We specify some default values for fields,
such as mana:short = 150. If unspecified, scalar fields (like int, uint, or
float) will be given a default of 0 while strings and tables will be given a
default of null. Another thing to note is the line friendly:bool = false
(deprecated);. Since you cannot delete fields from a table (to support backwards
compatability), you can set fields as deprecated, which will prevent the
generation of accessors for this field in the generated code. Be careful when
using deprecated, however, as it may break legacy code that used this accessor.

The Weapon table is a sub-table used within our FlatBuffer. It is used twice:
once within the Monster table and once within the Equipment union. For our
Monster, it is used to populate a vector of tables via the weapons field within
our Monster. It is also the only table referenced by the Equipment union.

The last part of the schema is the root_type. The root type declares what will
be the root table for the serialized data. In our case, the root type is our
Monster table.

The scalar types can also use alias type names such as int16 instead of short
and float32 instead of float. Thus we could also write the Weapon table as:

```
table Weapon {
  name:string;
  damage:int16;
}
```

### More Information About Schemas

You can find a complete guide to writing schema files in the Writing a schema
section of the Programmer's Guide. You can also view the formal Grammar of the
schema language.

## Compiling the Monsters' Schema

After you have written the FlatBuffers schema, the next step is to compile it.
If you have not already done so, please follow these instructions to build
flatc, the FlatBuffer compiler.

Once flatc is built successfully, compile the schema for your language:


{{< code-snippet-group groupId="tutorial">}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C++">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --cpp monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Java">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --java monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Kotlin">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --kotlin monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C#">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --csharp monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Go">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --go monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Python">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --python monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Javascript">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
# customize your TS -> JS transpilation
tsc monster_generated.ts
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Typescript">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="PHP">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --php monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Dart">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --dart monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lua">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --lua monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lobster">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --lobster monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Rust">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --rust monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Swift">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --swift monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

For a more complete guide to using the flatc compiler, please read the Using
the schema compiler section of the Programmer's Guide.

## Reading and Writing Monster FlatBuffers

Now that we have compiled the schema for our programming language, we can start
creating some monsters and serializing/deserializing them from FlatBuffers.

### Creating and Writing Orc FlatBuffers

The first step is to import/include the library, generated files, etc.

{{< code-snippet-group groupId="tutorial">}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C++">}}
{{< highlight cpp >}}
#include "monster_generated.h" // This was generated by `flatc`.

using namespace MyGame::Sample; // Specified in the schema.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Java">}}
{{< highlight java >}}
import MyGame.Sample.*; //The `flatc` generated files. (Monster, Vec3, etc.)
 
import com.google.flatbuffers.FlatBufferBuilder;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Kotlin">}}
{{< highlight kotlin >}}
import MyGame.Sample.* //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C#">}}
{{< highlight csharp >}}
using FlatBuffers;
using MyGame.Sample; // The `flatc` generated files. (Monster, Vec3, etc.)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Go">}}
{{< highlight go >}}
import (
    flatbuffers "github.com/google/flatbuffers/go"
    sample "MyGame/Sample"
)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Python">}}
{{< highlight python >}}
import flatbuffers
 
# Generated by `flatc`.
import MyGame.Sample.Color
import MyGame.Sample.Equipment
import MyGame.Sample.Monster
import MyGame.Sample.Vec3
import MyGame.Sample.Weapon
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Javascript">}}
{{< highlight javascript >}}
// The following code is an example - use your desired module flavor by transpiling from TS. 
var flatbuffers = require('/js/flatbuffers').flatbuffers;
var MyGame = require('./monster_generated').MyGame; // Generated by `flatc`.
 
//--------------------------------------------------------------------------//
 
// The following code is for browser-based HTML/JavaScript. Use the above code
// for JavaScript module loaders (e.g. Node.js).
<script src="../js/flatbuffers.js"></script>
<script src="monster_generated.js"></script> // Generated by `flatc`.{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Typescript">}}
{{< highlight typescript >}}
// note: import flatbuffers with your desired import method
 
import { MyGame } from './monster_generated';
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="PHP">}}
{{< highlight php >}}
// It is recommended that your use PSR autoload when using FlatBuffers in PHP.
// Here is an example from `SampleBinary.php`:
function __autoload($class_name) {
  // The last segment of the class name matches the file name.
  $class = substr($class_name, strrpos($class_name, "\\") + 1);
  $root_dir = join(DIRECTORY_SEPARATOR, array(dirname(dirname(__FILE__)))); // `flatbuffers` root.
 
  // Contains the `*.php` files for the FlatBuffers library and the `flatc` generated files.
  $paths = array(join(DIRECTORY_SEPARATOR, array($root_dir, "php")),
                 join(DIRECTORY_SEPARATOR, array($root_dir, "samples", "MyGame", "Sample")));
  foreach ($paths as $path) {
    $file = join(DIRECTORY_SEPARATOR, array($path, $class . ".php"));
    if (file_exists($file)) {
      require($file);
      break;
    }
  }
}
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Dart">}}
{{< highlight dart >}}
import 'package:flat_buffers/flat_buffers.dart' as fb;
 
// Generated by `flatc`.
import 'monster_my_game.sample_generated.dart' as myGame;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lua">}}
{{< highlight lua >}}
-- require the flatbuffers module
local flatbuffers = require("flatbuffers")
 
-- require the generated files from `flatc`.
local color = require("MyGame.Sample.Color")
local equipment = require("MyGame.Sample.Equipment")
local monster = require("MyGame.Sample.Monster")
local vec3 = require("MyGame.Sample.Vec3")
local weapon = require("MyGame.Sample.Weapon")
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lobster">}}
{{< highlight lobster >}}
import from "../lobster/"  // Where to find flatbuffers.lobster
import monster_generated
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Rust">}}
{{< highlight rust >}}
// import the flatbuffers runtime library
extern crate flatbuffers;
 
// import the generated code
#[allow(dead_code, unused_imports)]
#[path = "./monster_generated.rs"]
mod monster_generated;
pub use monster_generated::my_game::sample::{get_root_as_monster,
                                             Color, Equipment,
                                             Monster, MonsterArgs,
                                             Vec3,
                                             Weapon, WeaponArgs};
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Swift">}}
{{< highlight swift >}}
/**
// make sure that monster_generated.swift is included in your project
*/
import Flatbuffers
 
// typealiases for convenience
typealias Monster = MyGame1_Sample_Monster
typealias Weapon = MyGame1_Sample_Weapon
typealias Color = MyGame1_Sample_Color
typealias Vec3 = MyGame1_Sample_Vec3
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

Now we are ready to start building some buffers. In order to start, we need to
create an instance of the FlatBufferBuilder, which will contain the buffer as
it grows. You can pass an initial size of the buffer (here 1024 bytes), which
will grow automatically if needed:

{{< code-snippet-group groupId="tutorial">}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C++">}}
{{< highlight cpp >}}
// Create a `FlatBufferBuilder`, which will be used to create our
// monsters' FlatBuffers.
flatbuffers::FlatBufferBuilder builder(1024);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Java">}}
{{< highlight java >}}
// Create a `FlatBufferBuilder`, which will be used to create our
// monsters' FlatBuffers.
FlatBufferBuilder builder = new FlatBufferBuilder(1024);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Kotlin">}}
{{< highlight kotlin >}}
// Create a `FlatBufferBuilder`, which will be used to create our
// monsters' FlatBuffers.
val builder = FlatBufferBuilder(1024)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C#">}}
{{< highlight csharp >}}
// Create a `FlatBufferBuilder`, which will be used to create our
// monsters' FlatBuffers.
var builder = new FlatBufferBuilder(1024);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Go">}}
{{< highlight go >}}
// Create a `FlatBufferBuilder`, which will be used to create our
// monsters' FlatBuffers.
builder := flatbuffers.NewBuilder(1024)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Python">}}
{{< highlight python >}}
# Create a `FlatBufferBuilder`, which will be used to create our
# monsters' FlatBuffers.
builder = flatbuffers.Builder(1024)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Javascript">}}
{{< highlight javascript >}}
// Create a `flatbuffer.Builder`, which will be used to create our
// monsters' FlatBuffers.
var builder = new flatbuffers.Builder(1024);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Typescript">}}
{{< highlight typescript >}}
// Create a `flatbuffer.Builder`, which will be used to create our
// monsters' FlatBuffers.
let builder = new flatbuffers.Builder(1024);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="PHP">}}
{{< highlight php >}}
// Create a `FlatBufferBuilder`, which will be used to create our
// monsters' FlatBuffers.
$builder = new Google\FlatBuffers\FlatbufferBuilder(1024);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Dart">}}
{{< highlight dart >}}
// Create the fb.Builder object that will be used by our generated builders
// Note that if you are only planning to immediately get the byte array this builder would create,
// you can use the convenience method `toBytes()` on the generated builders.
// For example, you could do something like `new myGame.MonsterBuilder(...).toBytes()`
var builder = new fb.Builder(initialSize: 1024);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lua">}}
{{< highlight lua >}}
-- get access to the builder, providing an array of size 1024
local builder = flatbuffers.Builder(1024)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lobster">}}
{{< highlight lobster >}}
// get access to the builder
let builder = flatbuffers_builder {}
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Rust">}}
{{< highlight rust >}}
// Build up a serialized buffer algorithmically.
// Initialize it with a capacity of 1024 bytes.
let mut builder = flatbuffers::FlatBufferBuilder::new_with_capacity(1024);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Swift">}}
{{< highlight swift >}}
// create a `FlatBufferBuilder`, which will be used to serialize objects
let builder = FlatBufferBuilder(initialSize: 1024)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

After creating the builder, we can start serializing our data. Before we make
our orc Monster, let's create some Weapons: a Sword and an Axe.

{{< code-snippet-group groupId="tutorial">}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C++">}}
{{< highlight cpp >}}
auto weapon_one_name = builder.CreateString("Sword");
short weapon_one_damage = 3;
 
auto weapon_two_name = builder.CreateString("Axe");
short weapon_two_damage = 5;
 
// Use the `CreateWeapon` shortcut to create Weapons with all the fields set.
auto sword = CreateWeapon(builder, weapon_one_name, weapon_one_damage);
auto axe = CreateWeapon(builder, weapon_two_name, weapon_two_damage);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Java">}}
{{< highlight java >}}
int weaponOneName = builder.createString("Sword")
short weaponOneDamage = 3;
 
int weaponTwoName = builder.createString("Axe");
short weaponTwoDamage = 5;
 
// Use the `createWeapon()` helper function to create the weapons, since we set every field.
int sword = Weapon.createWeapon(builder, weaponOneName, weaponOneDamage);
int axe = Weapon.createWeapon(builder, weaponTwoName, weaponTwoDamage);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Kotlin">}}
{{< highlight kotlin >}}
val weaponOneName = builder.createString("Sword")
val weaponOneDamage: Short = 3;
 
val weaponTwoName = builder.createString("Axe")
val weaponTwoDamage: Short = 5;
 
// Use the `createWeapon()` helper function to create the weapons, since we set every field.
val sword = Weapon.createWeapon(builder, weaponOneName, weaponOneDamage)
val axe = Weapon.createWeapon(builder, weaponTwoName, weaponTwoDamage)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C#">}}
{{< highlight csharp >}}
var weaponOneName = builder.CreateString("Sword");
var weaponOneDamage = 3;
 
var weaponTwoName = builder.CreateString("Axe");
var weaponTwoDamage = 5;
 
// Use the `CreateWeapon()` helper function to create the weapons, since we set every field.
var sword = Weapon.CreateWeapon(builder, weaponOneName, (short)weaponOneDamage);
var axe = Weapon.CreateWeapon(builder, weaponTwoName, (short)weaponTwoDamage);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Go">}}
{{< highlight go >}}
weaponOne := builder.CreateString("Sword")
weaponTwo := builder.CreateString("Axe")
 
// Create the first `Weapon` ("Sword").
sample.WeaponStart(builder)
sample.WeaponAddName(builder, weaponOne)
sample.WeaponAddDamage(builder, 3)
sword := sample.WeaponEnd(builder)
 
// Create the second `Weapon` ("Axe").
sample.WeaponStart(builder)
sample.WeaponAddName(builder, weaponTwo)
sample.WeaponAddDamage(builder, 5)
axe := sample.WeaponEnd(builder)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Python">}}
{{< highlight python >}}
weapon_one = builder.CreateString('Sword')
weapon_two = builder.CreateString('Axe')
 
# Create the first `Weapon` ('Sword').
MyGame.Sample.Weapon.Start(builder)
MyGame.Sample.Weapon.AddName(builder, weapon_one)
MyGame.Sample.Weapon.AddDamage(builder, 3)
sword = MyGame.Sample.Weapon.End(builder)
 
# Create the second `Weapon` ('Axe').
MyGame.Sample.Weapon.Start(builder)
MyGame.Sample.Weapon.AddName(builder, weapon_two)
MyGame.Sample.Weapon.AddDamage(builder, 5)
axe = MyGame.Sample.Weapon.End(builder)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Javascript">}}
{{< highlight javascript >}}
var weaponOne = builder.createString('Sword');
var weaponTwo = builder.createString('Axe');
 
// Create the first `Weapon` ('Sword').
MyGame.Sample.Weapon.startWeapon(builder);
MyGame.Sample.Weapon.addName(builder, weaponOne);
MyGame.Sample.Weapon.addDamage(builder, 3);
var sword = MyGame.Sample.Weapon.endWeapon(builder);
 
// Create the second `Weapon` ('Axe').
MyGame.Sample.Weapon.startWeapon(builder);
MyGame.Sample.Weapon.addName(builder, weaponTwo);
MyGame.Sample.Weapon.addDamage(builder, 5);
var axe = MyGame.Sample.Weapon.endWeapon(builder);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Typescript">}}
{{< highlight typescript >}}
let weaponOne = builder.createString('Sword');
let weaponTwo = builder.createString('Axe');
 
// Create the first `Weapon` ('Sword').
MyGame.Sample.Weapon.startWeapon(builder);
MyGame.Sample.Weapon.addName(builder, weaponOne);
MyGame.Sample.Weapon.addDamage(builder, 3);
let sword = MyGame.Sample.Weapon.endWeapon(builder);
 
// Create the second `Weapon` ('Axe').
MyGame.Sample.Weapon.startWeapon(builder);
MyGame.Sample.Weapon.addName(builder, weaponTwo);
MyGame.Sample.Weapon.addDamage(builder, 5);
let axe = MyGame.Sample.Weapon.endWeapon(builder);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="PHP">}}
{{< highlight php >}}
// Create the `Weapon`s using the `createWeapon()` helper function.
$weapon_one_name = $builder->createString("Sword");
$sword = \MyGame\Sample\Weapon::CreateWeapon($builder, $weapon_one_name, 3);
 
$weapon_two_name = $builder->createString("Axe");
$axe = \MyGame\Sample\Weapon::CreateWeapon($builder, $weapon_two_name, 5);
 
// Create an array from the two `Weapon`s and pass it to the
// `CreateWeaponsVector()` method to create a FlatBuffer vector.
$weaps = array($sword, $axe);
$weapons = \MyGame\Sample\Monster::CreateWeaponsVector($builder, $weaps);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Dart">}}
{{< highlight dart >}}
// The generated Builder classes work much like in other languages,
final int weaponOneName = builder.writeString("Sword");
final int weaponOneDamage = 3;
 
final int weaponTwoName = builder.writeString("Axe");
final int weaponTwoDamage = 5;
 
final swordBuilder = new myGame.WeaponBuilder(builder)
  ..begin()
  ..addNameOffset(weaponOneName)
  ..addDamage(weaponOneDamage);
final int sword = swordBuilder.finish();
 
final axeBuilder = new myGame.WeaponBuilder(builder)
  ..begin()
  ..addNameOffset(weaponTwoName)
  ..addDamage(weaponTwoDamage);
final int axe = axeBuilder.finish();
 
// The generated ObjectBuilder classes offer an easier to use alternative
// at the cost of requiring some additional reference allocations. If memory
// usage is critical, or if you'll be working with especially large messages
// or tables, you should prefer using the generated Builder classes.
// The following code would produce an identical buffer as above.
final String weaponOneName = "Sword";
final int weaponOneDamage = 3;
 
final String weaponTwoName = "Axe";
final int weaponTwoDamage = 5;
 
final myGame.WeaponBuilder sword = new myGame.WeaponObjectBuilder(
  name: weaponOneName,
  damage: weaponOneDamage,
);
 
final myGame.WeaponBuilder axe = new myGame.WeaponObjectBuilder(
  name: weaponTwoName,
  damage: weaponTwoDamage,
);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lua">}}
{{< highlight lua >}}
local weaponOne = builder:CreateString("Sword")
local weaponTwo = builder:CreateString("Axe")
 
-- Create the first 'Weapon'
weapon.Start(builder)
weapon.AddName(builder, weaponOne)
weapon.AddDamage(builder, 3)
local sword = weapon.End(builder)
 
-- Create the second 'Weapon'
weapon.Start(builder)
weapon.AddName(builder, weaponTwo)
weapon.AddDamage(builder, 5)
local axe = weapon.End(builder)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lobster">}}
{{< highlight lobster >}}
let weapon_names = [ "Sword", "Axe" ]
let weapon_damages = [ 3, 5 ]
 
let weapon_offsets = map(weapon_names) name, i:
    let ns = builder.CreateString(name)
    MyGame_Sample_WeaponBuilder { b }
        .start()
        .add_name(ns)
        .add_damage(weapon_damages[i])
        .end()
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Rust">}}
{{< highlight rust >}}
// Serialize some weapons for the Monster: A 'sword' and an 'axe'.
let weapon_one_name = builder.create_string("Sword");
let weapon_two_name = builder.create_string("Axe");
 
// Use the `Weapon::create` shortcut to create Weapons with named field
// arguments.
let sword = Weapon::create(&mut builder, &WeaponArgs{
    name: Some(weapon_one_name),
    damage: 3,
});
let axe = Weapon::create(&mut builder, &WeaponArgs{
    name: Some(weapon_two_name),
    damage: 5,
});
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Swift">}}
{{< highlight swift >}}
let weapon1Name = builder.create(string: "Sword")
let weapon2Name = builder.create(string: "Axe")
 
// start creating the weapon by calling startWeapon
let weapon1Start = Weapon.startWeapon(&builder)
Weapon.add(name: weapon1Name, &builder)
Weapon.add(damage: 3, &builder)
// end the object by passing the start point for the weapon 1
let sword = Weapon.endWeapon(&builder, start: weapon1Start)
 
let weapon2Start = Weapon.startWeapon(&builder)
Weapon.add(name: weapon2Name, &builder)
Weapon.add(damage: 5, &builder)
let axe = Weapon.endWeapon(&builder, start: weapon2Start)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

Now let's create our monster, the orc. For this orc, lets make him red with
rage, positioned at (1.0, 2.0, 3.0), and give him a large pool of hit points
with 300. We can give him a vector of weapons to choose from (our Sword and Axe
from earlier). In this case, we will equip him with the Axe, since it is the 
most powerful of the two. Lastly, let's fill his inventory with some potential 
treasures that can be taken once he is defeated.

Before we serialize a monster, we need to first serialize any objects that are 
contained therein, i.e. we serialize the data tree using depth-first, pre-order
traversal. This is generally easy to do on any tree structures.

{{< code-snippet-group groupId="tutorial">}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C++">}}
{{< highlight cpp >}}
// Serialize a name for our monster, called "Orc".
auto name = builder.CreateString("Orc");
 
// Create a `vector` representing the inventory of the Orc. Each number
// could correspond to an item that can be claimed after he is slain.
unsigned char treasure[] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
auto inventory = builder.CreateVector(treasure, 10);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Java">}}
{{< highlight java >}}
// Serialize a name for our monster, called "Orc".
int name = builder.createString("Orc");
 
// Create a `vector` representing the inventory of the Orc. Each number
// could correspond to an item that can be claimed after he is slain.
byte[] treasure = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
int inv = Monster.createInventoryVector(builder, treasure);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Kotlin">}}
{{< highlight kotlin >}}
// Serialize a name for our monster, called "Orc".
val name = builder.createString("Orc")
 
// Create a `vector` representing the inventory of the Orc. Each number
// could correspond to an item that can be claimed after he is slain.
val treasure = byteArrayOf(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
val inv = Monster.createInventoryVector(builder, treasure)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C#">}}
{{< highlight csharp >}}
// Serialize a name for our monster, called "Orc".
var name = builder.CreateString("Orc");
 
// Create a `vector` representing the inventory of the Orc. Each number
// could correspond to an item that can be claimed after he is slain.
// Note: Since we prepend the bytes, this loop iterates in reverse order.
Monster.StartInventoryVector(builder, 10);
for (int i = 9; i >= 0; i--)
{
  builder.AddByte((byte)i);
}
var inv = builder.EndVector();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Go">}}
{{< highlight go >}}
// Serialize a name for our monster, called "Orc".
name := builder.CreateString("Orc")
 
// Create a `vector` representing the inventory of the Orc. Each number
// could correspond to an item that can be claimed after he is slain.
// Note: Since we prepend the bytes, this loop iterates in reverse.
sample.MonsterStartInventoryVector(builder, 10)
for i := 9; i >= 0; i-- {
        builder.PrependByte(byte(i))
}
inv := builder.EndVector(10)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Python">}}
{{< highlight python >}}
# Serialize a name for our monster, called "Orc".
name = builder.CreateString("Orc")
 
# Create a `vector` representing the inventory of the Orc. Each number
# could correspond to an item that can be claimed after he is slain.
# Note: Since we prepend the bytes, this loop iterates in reverse.
MyGame.Sample.Monster.StartInventoryVector(builder, 10)
for i in reversed(range(0, 10)):
  builder.PrependByte(i)
inv = builder.EndVector()
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Javascript">}}
{{< highlight javascript >}}
// Serialize a name for our monster, called 'Orc'.
var name = builder.createString('Orc');
 
// Create a `vector` representing the inventory of the Orc. Each number
// could correspond to an item that can be claimed after he is slain.
var treasure = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var inv = MyGame.Sample.Monster.createInventoryVector(builder, treasure);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Typescript">}}
{{< highlight typescript >}}
// Serialize a name for our monster, called 'Orc'.
let name = builder.createString('Orc');
 
// Create a `vector` representing the inventory of the Orc. Each number
// could correspond to an item that can be claimed after he is slain.
let treasure = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let inv = MyGame.Sample.Monster.createInventoryVector(builder, treasure);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="PHP">}}
{{< highlight php >}}
// Serialize a name for our monster, called "Orc".
$name = $builder->createString("Orc");
 
// Create a `vector` representing the inventory of the Orc. Each number
// could correspond to an item that can be claimed after he is slain.
$treasure = array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
$inv = \MyGame\Sample\Monster::CreateInventoryVector($builder, $treasure);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Dart">}}
{{< highlight dart >}}
// Serialize a name for our monster, called "Orc".
final int name = builder.writeString('Orc');
 
// Create a list representing the inventory of the Orc. Each number
// could correspond to an item that can be claimed after he is slain.
final List<int> treasure = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
final inventory = builder.writeListUint8(treasure);
 
// The following code should be used instead if you intend to use the
// ObjectBuilder classes:
// Serialize a name for our monster, called "Orc".
final String name = 'Orc';
 
// Create a list representing the inventory of the Orc. Each number
// could correspond to an item that can be claimed after he is slain.
final List<int> treasure = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lua">}}
{{< highlight lua >}}
-- Serialize a name for our mosnter, called 'orc'
local name = builder:CreateString("Orc")
 
-- Create a `vector` representing the inventory of the Orc. Each number
-- could correspond to an item that can be claimed after he is slain.
-- Note: Since we prepend the bytes, this loop iterates in reverse.
monster.StartInventoryVector(builder, 10)
for i=10,1,-1 do
    builder:PrependByte(i)
end
local inv = builder:EndVector(10)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lobster">}}
{{< highlight lobster >}}
// Name of the monster.
let name = builder.CreateString("Orc")
 
// Inventory.
let inv = builder.MyGame_Sample_MonsterCreateInventoryVector(map(10): _)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Rust">}}
{{< highlight rust >}}
// Name of the Monster.
let name = builder.create_string("Orc");
 
// Inventory.
let inventory = builder.create_vector(&[0u8, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Swift">}}
{{< highlight swift >}}
// Name of the Monster.
let name = builder.create(string: "Orc")
 
// create inventory
let inventory: [Byte] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
let inventoryOffset = builder.createVector(inventory)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

We serialized two built-in data types (string and vector) and captured their 
return values. These values are offsets into the serialized data, indicating 
where they are stored, such that we can refer to them below when adding fields
to our monster.

Note: To create a vector of nested objects (e.g. tables, strings, or other
vectors), collect their offsets into a temporary data structure, and then create 
an additional vector containing their offsets.

If instead of creating a vector from an existing array you serialize elements
individually one by one, take care to note that this happens in reverse order,
as buffers are built back to front.

For example, take a look at the two Weapons that we created earlier (Sword and
Axe). These are both FlatBuffer tables, whose offsets we now store in memory.
Therefore we can create a FlatBuffer vector to contain these offsets.

{{< code-snippet-group groupId="tutorial">}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C++">}}
{{< highlight cpp >}}
// Place the weapons into a `std::vector`, then convert that into a FlatBuffer `vector`.
std::vector<flatbuffers::Offset<Weapon>> weapons_vector;
weapons_vector.push_back(sword);
weapons_vector.push_back(axe);
auto weapons = builder.CreateVector(weapons_vector);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Java">}}
{{< highlight java >}}
// Place the two weapons into an array, and pass it to the `createWeaponsVector()` method to
// create a FlatBuffer vector.
int[] weaps = new int[2];
weaps[0] = sword;
weaps[1] = axe;
 
// Pass the `weaps` array into the `createWeaponsVector()` method to create a FlatBuffer vector.
int weapons = Monster.createWeaponsVector(builder, weaps);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Kotlin">}}
{{< highlight kotlin >}}
// Place the two weapons into an array, and pass it to the `createWeaponsVector()` method to
// create a FlatBuffer vector.
val weaps = intArrayOf(sword, axe)
 
// Pass the `weaps` array into the `createWeaponsVector()` method to create a FlatBuffer vector.
val weapons = Monster.createWeaponsVector(builder, weaps)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C#">}}
{{< highlight csharp >}}
var weaps = new Offset<Weapon>[2];
weaps[0] = sword;
weaps[1] = axe;
 
// Pass the `weaps` array into the `CreateWeaponsVector()` method to create a FlatBuffer vector.
var weapons = Monster.CreateWeaponsVector(builder, weaps);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Go">}}
{{< highlight go >}}
// Create a FlatBuffer vector and prepend the weapons.
// Note: Since we prepend the data, prepend them in reverse order.
sample.MonsterStartWeaponsVector(builder, 2)
builder.PrependUOffsetT(axe)
builder.PrependUOffsetT(sword)
weapons := builder.EndVector(2)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Python">}}
{{< highlight python >}}
# Create a FlatBuffer vector and prepend the weapons.
# Note: Since we prepend the data, prepend them in reverse order.
MyGame.Sample.Monster.StartWeaponsVector(builder, 2)
builder.PrependUOffsetTRelative(axe)
builder.PrependUOffsetTRelative(sword)
weapons = builder.EndVector()
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Javascript">}}
{{< highlight javascript >}}
// Create an array from the two `Weapon`s and pass it to the
// `createWeaponsVector()` method to create a FlatBuffer vector.
var weaps = [sword, axe];
var weapons = MyGame.Sample.Monster.createWeaponsVector(builder, weaps);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Typescript">}}
{{< highlight typescript >}}
// Create an array from the two `Weapon`s and pass it to the
// `createWeaponsVector()` method to create a FlatBuffer vector.
let weaps = [sword, axe];
let weapons = MyGame.Sample.Monster.createWeaponsVector(builder, weaps);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="PHP">}}
{{< highlight php >}}
// Create an array from the two `Weapon`s and pass it to the
// `CreateWeaponsVector()` method to create a FlatBuffer vector.
$weaps = array($sword, $axe);
$weapons = \MyGame\Sample\Monster::CreateWeaponsVector($builder, $weaps);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Dart">}}
{{< highlight dart >}}
// If using the Builder classes, serialize the `[sword,axe]`
final weapons = builder.writeList([sword, axe]);
 
// If using the ObjectBuilders, just create an array from the two `Weapon`s
final List<myGame.WeaponBuilder> weaps = [sword, axe];
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lua">}}
{{< highlight lua >}}
-- Create a FlatBuffer vector and prepend the weapons.
-- Note: Since we prepend the data, prepend them in reverse order.
monster.StartWeaponsVector(builder, 2)
builder:PrependUOffsetTRelative(axe)
builder:PrependUOffsetTRelative(sword)
local weapons = builder:EndVector(2)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lobster">}}
{{< highlight lobster >}}
let weapons = builder.MyGame_Sample_MonsterCreateWeaponsVector(weapon_offsets)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Rust">}}
{{< highlight rust >}}
// Create a FlatBuffer `vector` that contains offsets to the sword and axe
// we created above.
let weapons = builder.create_vector(&[sword, axe]);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Swift">}}
{{< highlight swift >}}
// Create a FlatBuffer `vector` that contains offsets to the sword and axe
// we created above.
let weaponsOffset = builder.createVector(ofOffsets: [sword, axe])
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

Note there are additional convenience overloads of CreateVector, allowing you to
work with data that's not in a `std::vector` or allowing you to generate elements
by calling a lambda. For the common case of `std::vector<std::string>` there's
also CreateVectorOfStrings.

Note that vectors of structs are serialized differently from tables, since
structs are stored in-line in the vector. For example, to create a vector for
the path field above:

{{< code-snippet-group groupId="tutorial">}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C++">}}
{{< highlight cpp >}}
Vec3 points[] = { Vec3(1.0f, 2.0f, 3.0f), Vec3(4.0f, 5.0f, 6.0f) };
auto path = builder.CreateVectorOfStructs(points, 2);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Java">}}
{{< highlight java >}}
Monster.startPathVector(fbb, 2);
Vec3.createVec3(builder, 1.0f, 2.0f, 3.0f);
Vec3.createVec3(builder, 4.0f, 5.0f, 6.0f);
int path = fbb.endVector();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Kotlin">}}
{{< highlight kotlin >}}
Monster.startPathVector(fbb, 2)
Vec3.createVec3(builder, 1.0f, 2.0f, 3.0f)
Vec3.createVec3(builder, 4.0f, 5.0f, 6.0f)
val path = fbb.endVector()
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C#">}}
{{< highlight csharp >}}
Monster.StartPathVector(fbb, 2);
Vec3.CreateVec3(builder, 1.0f, 2.0f, 3.0f);
Vec3.CreateVec3(builder, 4.0f, 5.0f, 6.0f);
var path = fbb.EndVector();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Go">}}
{{< highlight go >}}
sample.MonsterStartPathVector(builder, 2)
sample.CreateVec3(builder, 1.0, 2.0, 3.0)
sample.CreateVec3(builder, 4.0, 5.0, 6.0)
path := builder.EndVector(2)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Python">}}
{{< highlight python >}}
MyGame.Sample.Monster.StartPathVector(builder, 2)
MyGame.Sample.Vec3.CreateVec3(builder, 1.0, 2.0, 3.0)
MyGame.Sample.Vec3.CreateVec3(builder, 4.0, 5.0, 6.0)
path = builder.EndVector()
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Javascript">}}
{{< highlight javascript >}}
MyGame.Sample.Monster.startPathVector(builder, 2);
MyGame.Sample.Vec3.createVec3(builder, 1.0, 2.0, 3.0);
MyGame.Sample.Vec3.createVec3(builder, 4.0, 5.0, 6.0);
var path = builder.endVector();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Typescript">}}
{{< highlight typescript >}}
MyGame.Sample.Monster.startPathVector(builder, 2);
MyGame.Sample.Vec3.createVec3(builder, 1.0, 2.0, 3.0);
MyGame.Sample.Vec3.createVec3(builder, 4.0, 5.0, 6.0);
let path = builder.endVector();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="PHP">}}
{{< highlight php >}}
\MyGame\Example\Monster::StartPathVector($builder, 2);
\MyGame\Sample\Vec3::CreateVec3($builder, 1.0, 2.0, 3.0);
\MyGame\Sample\Vec3::CreateVec3($builder, 1.0, 2.0, 3.0);
$path = $builder->endVector();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Dart">}}
{{< highlight dart >}}
// Using the Builder classes, you can write a list of structs like so:
// Note that the intended order should be reversed if order is important.
final vec3Builder = new myGame.Vec3Builder(builder);
vec3Builder.finish(4.0, 5.0, 6.0);
vec3Builder.finish(1.0, 2.0, 3.0);
final int path = builder.endStructVector(2); // the length of the vector
 
// Otherwise, using the ObjectBuilder classes:
// The dart implementation provides a simple interface for writing vectors
// of structs, in `writeListOfStructs`. This method takes
// `List<ObjectBuilder>` and is used by the generated builder classes.
final List<myGame.Vec3ObjectBuilder> path = [
  new myGame.Vec3ObjectBuilder(x: 1.0, y: 2.0, z: 3.0),
  new myGame.Vec3ObjectBuilder(x: 4.0, y: 5.0, z: 6.0)
];
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lua">}}
{{< highlight lua >}}
-- Create a FlatBuffer vector and prepend the path locations.
-- Note: Since we prepend the data, prepend them in reverse order.
monster.StartPathVector(builder, 2)
vec3.CreateVec3(builder, 1.0, 2.0, 3.0)
vec3.CreateVec3(builder, 4.0, 5.0, 6.0)
local path = builder:EndVector(2)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lobster">}}
{{< highlight lobster >}}
builder.MyGame_Sample_MonsterStartPathVector(2)
builder.MyGame_Sample_CreateVec3(1.0, 2.0, 3.0)
builder.MyGame_Sample_CreateVec3(4.0, 5.0, 6.0)
let path = builder.EndVector(2)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Rust">}}
{{< highlight rust >}}
// Create the path vector of Vec3 objects.
let x = Vec3::new(1.0, 2.0, 3.0);
let y = Vec3::new(4.0, 5.0, 6.0);
let path = builder.create_vector(&[x, y]);
 
// Note that, for convenience, it is also valid to create a vector of
// references to structs, like this:
// let path = builder.create_vector(&[&x, &y]);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Swift">}}
{{< highlight swift >}}
let points = fbb.createVector(ofStructs: [
  Vec3(x: 1, y: 2, z: 3),
  Vec3(x: 4, y: 5, z: 6)
])
 
// OR
var vec3 = [
  Vec3(x: 1, y: 2, z: 3),
  Vec3(x: 4, y: 5, z: 6)
]
Monster.startVectorOfVec3(2, in: &fbb)
for i in obj {
  _ = create(struct: i)
}
let points = fbb.endVector(len: size)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

We have now serialized the non-scalar components of the orc, so we can serialize the monster itself:

{{< code-snippet-group groupId="tutorial">}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C++">}}
{{< highlight cpp >}}
// Create the position struct
auto position = Vec3(1.0f, 2.0f, 3.0f);
 
// Set his hit points to 300 and his mana to 150.
int hp = 300;
int mana = 150;
 
// Finally, create the monster using the `CreateMonster` helper function
// to set all fields.
auto orc = CreateMonster(builder, &position, mana, hp, name, inventory,
                        Color_Red, weapons, Equipment_Weapon, axe.Union(),
                        path);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Java">}}
{{< highlight java >}}
// Create our monster using `startMonster()` and `endMonster()`.
Monster.startMonster(builder);
Monster.addPos(builder, Vec3.createVec3(builder, 1.0f, 2.0f, 3.0f));
Monster.addName(builder, name);
Monster.addColor(builder, Color.Red);
Monster.addHp(builder, (short)300);
Monster.addInventory(builder, inv);
Monster.addWeapons(builder, weapons);
Monster.addEquippedType(builder, Equipment.Weapon);
Monster.addEquipped(builder, axe);
Monster.addPath(builder, path);
int orc = Monster.endMonster(builder);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Kotlin">}}
{{< highlight kotlin >}}
// Create our monster using `startMonster()` and `endMonster()`.
Monster.startMonster(builder)
Monster.addPos(builder, Vec3.createVec3(builder, 1.0f, 2.0f, 3.0f))
Monster.addName(builder, name)
Monster.addColor(builder, Color.Red)
Monster.addHp(builder, 300.toShort())
Monster.addInventory(builder, inv)
Monster.addWeapons(builder, weapons)
Monster.addEquippedType(builder, Equipment.Weapon)
Monster.addEquipped(builder, axe)
Monster.addPath(builder, path)
val orc = Monster.endMonster(builder)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C#">}}
{{< highlight csharp >}}
// Create our monster using `StartMonster()` and `EndMonster()`.
Monster.StartMonster(builder);
Monster.AddPos(builder, Vec3.CreateVec3(builder, 1.0f, 2.0f, 3.0f));
Monster.AddHp(builder, (short)300);
Monster.AddName(builder, name);
Monster.AddInventory(builder, inv);
Monster.AddColor(builder, Color.Red);
Monster.AddWeapons(builder, weapons);
Monster.AddEquippedType(builder, Equipment.Weapon);
Monster.AddEquipped(builder, axe.Value); // Axe
Monster.AddPath(builder, path);
var orc = Monster.EndMonster(builder);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Go">}}
{{< highlight go >}}
// Create our monster using `MonsterStart()` and `MonsterEnd()`.
sample.MonsterStart(builder)
sample.MonsterAddPos(builder, sample.CreateVec3(builder, 1.0, 2.0, 3.0))
sample.MonsterAddHp(builder, 300)
sample.MonsterAddName(builder, name)
sample.MonsterAddInventory(builder, inv)
sample.MonsterAddColor(builder, sample.ColorRed)
sample.MonsterAddWeapons(builder, weapons)
sample.MonsterAddEquippedType(builder, sample.EquipmentWeapon)
sample.MonsterAddEquipped(builder, axe)
sample.MonsterAddPath(builder, path)
orc := sample.MonsterEnd(builder)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Python">}}
{{< highlight python >}}
# Create our monster by using `Monster.Start()` and `Monster.End()`.
MyGame.Sample.Monster.Start(builder)
MyGame.Sample.Monster.AddPos(builder,
                        MyGame.Sample.Vec3.CreateVec3(builder, 1.0, 2.0, 3.0))
MyGame.Sample.Monster.AddHp(builder, 300)
MyGame.Sample.Monster.AddName(builder, name)
MyGame.Sample.Monster.AddInventory(builder, inv)
MyGame.Sample.Monster.AddColor(builder,
                                      MyGame.Sample.Color.Color().Red)
MyGame.Sample.Monster.AddWeapons(builder, weapons)
MyGame.Sample.Monster.AddEquippedType(
    builder, MyGame.Sample.Equipment.Equipment().Weapon)
MyGame.Sample.Monster.AddEquipped(builder, axe)
MyGame.Sample.Monster.AddPath(builder, path)
orc = MyGame.Sample.Monster.End(builder)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Javascript">}}
{{< highlight javascript >}}
// Create our monster by using `startMonster()` and `endMonster()`.
MyGame.Sample.Monster.startMonster(builder);
MyGame.Sample.Monster.addPos(builder,
                       MyGame.Sample.Vec3.createVec3(builder, 1.0, 2.0, 3.0));
MyGame.Sample.Monster.addHp(builder, 300);
MyGame.Sample.Monster.addColor(builder, MyGame.Sample.Color.Red)
MyGame.Sample.Monster.addName(builder, name);
MyGame.Sample.Monster.addInventory(builder, inv);
MyGame.Sample.Monster.addWeapons(builder, weapons);
MyGame.Sample.Monster.addEquippedType(builder, MyGame.Sample.Equipment.Weapon);
MyGame.Sample.Monster.addEquipped(builder, axe);
MyGame.Sample.Monster.addPath(builder, path);
var orc = MyGame.Sample.Monster.endMonster(builder);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Typescript">}}
{{< highlight typescript >}}
// Create our monster by using `startMonster()` and `endMonster()`.
MyGame.Sample.Monster.startMonster(builder);
MyGame.Sample.Monster.addPos(builder,
                       MyGame.Sample.Vec3.createVec3(builder, 1.0, 2.0, 3.0));
MyGame.Sample.Monster.addHp(builder, 300);
MyGame.Sample.Monster.addColor(builder, MyGame.Sample.Color.Red)
MyGame.Sample.Monster.addName(builder, name);
MyGame.Sample.Monster.addInventory(builder, inv);
MyGame.Sample.Monster.addWeapons(builder, weapons);
MyGame.Sample.Monster.addEquippedType(builder, MyGame.Sample.Equipment.Weapon);
MyGame.Sample.Monster.addEquipped(builder, axe);
MyGame.Sample.Monster.addPath(builder, path);
let orc = MyGame.Sample.Monster.endMonster(builder);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="PHP">}}
{{< highlight php >}}
// Create our monster by using `StartMonster()` and `EndMonster()`.
\MyGame\Sample\Monster::StartMonster($builder);
\MyGame\Sample\Monster::AddPos($builder,
                    \MyGame\Sample\Vec3::CreateVec3($builder, 1.0, 2.0, 3.0));
\MyGame\Sample\Monster::AddHp($builder, 300);
\MyGame\Sample\Monster::AddName($builder, $name);
\MyGame\Sample\Monster::AddInventory($builder, $inv);
\MyGame\Sample\Monster::AddColor($builder, \MyGame\Sample\Color::Red);
\MyGame\Sample\Monster::AddWeapons($builder, $weapons);
\MyGame\Sample\Monster::AddEquippedType($builder, \MyGame\Sample\Equipment::Weapon);
\MyGame\Sample\Monster::AddEquipped($builder, $axe);
\MyGame\Sample\Monster::AddPath($builder, $path);
$orc = \MyGame\Sample\Monster::EndMonster($builder);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Dart">}}
{{< highlight dart >}}
// Using the Builder API:
// Set his hit points to 300 and his mana to 150.
final int hp = 300;
final int mana = 150;
 
final monster = new myGame.MonsterBuilder(builder)
  ..begin()
  ..addNameOffset(name)
  ..addInventoryOffset(inventory)
  ..addWeaponsOffset(weapons)
  ..addEquippedType(myGame.EquipmentTypeId.Weapon)
  ..addEquippedOffset(axe)
  ..addHp(hp)
  ..addMana(mana)
  ..addPos(vec3Builder.finish(1.0, 2.0, 3.0))
  ..addPathOffset(path)
  ..addColor(myGame.Color.Red);
 
final int orc = monster.finish();
 
// -Or- using the ObjectBuilder API:
// Set his hit points to 300 and his mana to 150.
final int hp = 300;
final int mana = 150;
 
// Note that these parameters are optional - it is not necessary to set
// all of them.
// Also note that it is not necessary to `finish` the builder helpers above
// - the generated code will automatically reuse offsets if the same object
// is used in more than one place (e.g. the axe appearing in `weapons` and
// `equipped`).
final myGame.MonsterBuilder orcBuilder = new myGame.MonsterBuilder(
  name: name,
  inventory: treasure,
  weapons: weaps,
  equippedType: myGame.EquipmentTypeId.Weapon,
  equipped: axe,
  path: path,
  hp: hp,
  mana: mana,
  pos: new myGame.Vec3Builder(x: 1.0, y: 2.0, z: 3.0),
  color: myGame.Color.Red,
  path: [
      new myGame.Vec3ObjectBuilder(x: 1.0, y: 2.0, z: 3.0),
      new myGame.Vec3ObjectBuilder(x: 4.0, y: 5.0, z: 6.0)
  ]);
 
final int orc = orcBuilder.finish(builder);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lua">}}
{{< highlight lua >}}
-- Create our monster by using Start() andEnd()
monster.Start(builder)
monster.AddPos(builder, vec3.CreateVec3(builder, 1.0, 2.0, 3.0))
monster.AddHp(builder, 300)
monster.AddName(builder, name)
monster.AddInventory(builder, inv)
monster.AddColor(builder, color.Red)
monster.AddWeapons(builder, weapons)
monster.AddEquippedType(builder, equipment.Weapon)
monster.AddEquipped(builder, axe)
monster.AddPath(builder, path)
local orc = monster.End(builder)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lobster">}}
{{< highlight lobster >}}
let orc = MyGame_Sample_MonsterBuilder { b }
    .start()
    .add_pos(b.MyGame_Sample_CreateVec3(1.0, 2.0, 3.0))
    .add_hp(300)
    .add_name(name)
    .add_inventory(inv)
    .add_color(MyGame_Sample_Color_Red)
    .add_weapons(weapons)
    .add_equipped_type(MyGame_Sample_Equipment_Weapon)
    .add_equipped(weapon_offsets[1])
    .add_path(path)
    .end()
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Rust">}}
{{< highlight rust >}}
// Create the monster using the `Monster::create` helper function. This
// function accepts a `MonsterArgs` struct, which supplies all of the data
// needed to build a `Monster`. To supply empty/default fields, just use the
// Rust built-in `Default::default()` function, as demonstrated below.
let orc = Monster::create(&mut builder, &MonsterArgs{
    pos: Some(&Vec3::new(1.0f32, 2.0f32, 3.0f32)),
    mana: 150,
    hp: 80,
    name: Some(name),
    inventory: Some(inventory),
    color: Color::Red,
    weapons: Some(weapons),
    equipped_type: Equipment::Weapon,
    equipped: Some(axe.as_union_value()),
    path: Some(path),
    ..Default::default()
});
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Swift">}}
{{< highlight swift >}}
let start = Monster.startMonster(&builder)
Monster.add(pos: Vec3(x: 1, y: 2, z: 3), &builder)
Monster.add(hp: 300, &builder)
Monster.add(name: name, &builder)
Monster.addVectorOf(inventory: inventoryOffset, &builder)
Monster.add(color: .red, &builder)
Monster.addVectorOf(weapons: weaponsOffset, &builder)
Monster.add(equippedType: .weapon, &builder)
Monster.add(equipped: axe, &builder)
var orc = Monster.endMonster(&builder, start: start)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

Note how we create Vec3 struct in-line in the table. Unlike tables, structs are
simple combinations of scalars that are always stored inline, just like scalars
themselves.

**Important:** Unlike structs, you should not nest tables or other objects, which is
why we created all the strings/vectors/tables that this monster refers to before
start. If you try to create any of them between start and end, you will get an
assert/exception/panic depending on your language.

Note: Since we are passing 150 as the mana field, which happens to be the
default value, the field will not actually be written to the buffer, since the
default value will be returned on query anyway. This is a nice space savings,
especially if default values are common in your data. It also means that you do
not need to be worried about adding a lot of fields that are only used in a small
number of instances, as it will not bloat the buffer if unused.

Before finishing the serialization, let's take a quick look at FlatBuffer union
Equipped. There are two parts to each FlatBuffer union. The first is a hidden
field _type that is generated to hold the type of table referred to by the
union. This allows you to know which type to cast to at runtime. Second is the
union's data.

In our example, the last two things we added to our Monster were the Equipped
Type and the Equipped union itself.

Here is a repetition of these lines, to help highlight them more clearly:

{{< code-snippet-group groupId="tutorial">}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C++">}}
{{< highlight cpp >}}
monster_builder.add_equipped_type(Equipment_Weapon); // Union type
monster_builder.add_equipped(axe.Union()); // Union data
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Java">}}
{{< highlight java >}}
Monster.addEquippedType(builder, Equipment.Weapon); // Union type
Monster.addEquipped(axe); // Union data
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Kotlin">}}
{{< highlight kotlin >}}
Monster.addEquippedType(builder, Equipment.Weapon) // Union type
Monster.addEquipped(axe) // Union data
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C#">}}
{{< highlight csharp >}}
Monster.AddEquippedType(builder, Equipment.Weapon); // Union type
Monster.AddEquipped(builder, axe.Value); // Union data
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Go">}}
{{< highlight go >}}
sample.MonsterAddEquippedType(builder, sample.EquipmentWeapon) // Union type
sample.MonsterAddEquipped(builder, axe) // Union data
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Python">}}
{{< highlight python >}}
MyGame.Sample.Monster.AddEquippedType(            # Union type
    builder, MyGame.Sample.Equipment.Equipment().Weapon)
MyGame.Sample.Monster.AddEquipped(builder, axe)   # Union data
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Javascript">}}
{{< highlight javascript >}}
MyGame.Sample.Monster.addEquippedType(builder, MyGame.Sample.Equipment.Weapon); // Union type
MyGame.Sample.Monster.addEquipped(builder, axe); // Union data
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Typescript">}}
{{< highlight typescript >}}
MyGame.Sample.Monster.addEquippedType(builder, MyGame.Sample.Equipment.Weapon); // Union type
MyGame.Sample.Monster.addEquipped(builder, axe); // Union data
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="PHP">}}
{{< highlight php >}}
\MyGame\Sample\Monster::AddEquippedType($builder, \MyGame\Sample\Equipment::Weapon); // Union type
\MyGame\Sample\Monster::AddEquipped($builder, $axe); // Union data
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Dart">}}
{{< highlight dart >}}
// using the builder API:
..addEquippedType(myGame.EquipmentTypeId.Weapon)
..addEquippedOffset(axe)
 
// in the ObjectBuilder API:
equippedTypeId: myGame.EquipmentTypeId.Weapon,  // Union type
equipped: axe,                                  // Union data
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lua">}}
{{< highlight lua >}}
monster.AddEquippedType(builder, equipment.Weapon) -- Union type
monster.AddEquipped(builder, axe) -- Union data
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lobster">}}
{{< highlight lobster >}}
.add_equipped_type(MyGame_Sample_Equipment_Weapon)
.add_equipped(axe)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Rust">}}
{{< highlight rust >}}
// You need to call `as_union_value` to turn an object into a type that
// can be used as a union value.
monster_builder.add_equipped_type(Equipment::Weapon); // Union type
monster_builder.add_equipped(axe.as_union_value()); // Union data
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Swift">}}
{{< highlight swift >}}
Monster.add(equippedType: .weapon, builder) // Type of union
Monster.add(equipped: axe, builder) // Union data
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

After you have created your buffer, you will have the offset to the root of
the data in the orc variable, so you can finish the buffer by calling the
appropriate finish method.

{{< code-snippet-group groupId="tutorial">}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C++">}}
{{< highlight cpp >}}
// Call `Finish()` to instruct the builder that this monster is complete.
// Note: Regardless of how you created the `orc`, you still need to call
// `Finish()` on the `FlatBufferBuilder`.
builder.Finish(orc); // You could also call `FinishMonsterBuffer(builder, orc);`.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Java">}}
{{< highlight java >}}
// Call `finish()` to instruct the builder that this monster is complete.
builder.finish(orc); // You could also call `Monster.finishMonsterBuffer(builder, orc);`.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Kotlin">}}
{{< highlight kotlin >}}
// Call `finish()` to instruct the builder that this monster is complete.
builder.finish(orc) // You could also call `Monster.finishMonsterBuffer(builder, orc);`.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C#">}}
{{< highlight csharp >}}
// Call `Finish()` to instruct the builder that this monster is complete.
builder.Finish(orc.Value); // You could also call `Monster.FinishMonsterBuffer(builder, orc);`.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Go">}}
{{< highlight go >}}
// Call `Finish()` to instruct the builder that this monster is complete.
builder.Finish(orc)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Python">}}
{{< highlight python >}}
# Call `Finish()` to instruct the builder that this monster is complete.
builder.Finish(orc)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Javascript">}}
{{< highlight javascript >}}
// Call `finish()` to instruct the builder that this monster is complete.
builder.finish(orc); // You could also call `MyGame.Sample.Monster.finishMonsterBuffer(builder, orc);`.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Typescript">}}
{{< highlight typescript >}}
// Call `finish()` to instruct the builder that this monster is complete.
builder.finish(orc); // You could also call `MyGame.Sample.Monster.finishMonsterBuffer(builder, orc);`.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="PHP">}}
{{< highlight php >}}
// Call `finish()` to instruct the builder that this monster is complete.
 $builder->finish($orc); // You may also call `\MyGame\Sample\Monster::FinishMonsterBuffer($builder, $orc);`.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Dart">}}
{{< highlight dart >}}
// Call `finish()` to instruct the builder that this monster is complete.
// See the next code section, as in Dart `finish` will also return the byte array.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lua">}}
{{< highlight lua >}}
-- Call 'Finish()' to instruct the builder that this monster is complete.
builder:Finish(orc)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lobster">}}
{{< highlight lobster >}}
// Call `Finish()` to instruct the builder that this monster is complete.
builder.Finish(orc)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Rust">}}
{{< highlight rust >}}
// Call `finish()` to instruct the builder that this monster is complete.
builder.finish(orc, None);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Swift">}}
{{< highlight swift >}}
// Call `finish(offset:)` to instruct the builder that this monster is complete.
builder.finish(offset: orc)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

The buffer is now ready to be stored somewhere, sent over the network, be
compressed, or whatever you'd like to do with it. You can access the buffer
like so:

{{< code-snippet-group groupId="tutorial">}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C++">}}
{{< highlight cpp >}}
// This must be called after `Finish()`.
uint8_t *buf = builder.GetBufferPointer();
int size = builder.GetSize(); // Returns the size of the buffer that
                              // `GetBufferPointer()` points to.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Java">}}
{{< highlight java >}}
// This must be called after `finish()`.
java.nio.ByteBuffer buf = builder.dataBuffer();
// The data in this ByteBuffer does NOT start at 0, but at buf.position().
// The number of bytes is buf.remaining().
 
// Alternatively this copies the above data out of the ByteBuffer for you:
byte[] buf = builder.sizedByteArray();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Kotlin">}}
{{< highlight kotlin >}}
// This must be called after `finish()`.
val buf = builder.dataBuffer()
// The data in this ByteBuffer does NOT start at 0, but at buf.position().
// The number of bytes is buf.remaining().
 
// Alternatively this copies the above data out of the ByteBuffer for you:
val buf = builder.sizedByteArray()
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C#">}}
{{< highlight csharp >}}
// This must be called after `Finish()`.
var buf = builder.DataBuffer; // Of type `FlatBuffers.ByteBuffer`.
// The data in this ByteBuffer does NOT start at 0, but at buf.Position.
// The end of the data is marked by buf.Length, so the size is
// buf.Length - buf.Position.
 
// Alternatively this copies the above data out of the ByteBuffer for you:
byte[] buf = builder.SizedByteArray();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Go">}}
{{< highlight go >}}
// This must be called after `Finish()`.
buf := builder.FinishedBytes() // Of type `byte[]`.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Python">}}
{{< highlight python >}}
# This must be called after `Finish()`.
buf = builder.Output() // Of type `bytearray`.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Javascript">}}
{{< highlight javascript >}}
// This must be called after `finish()`.
var buf = builder.asUint8Array(); // Of type `Uint8Array`.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Typescript">}}
{{< highlight typescript >}}
// This must be called after `finish()`.
let buf = builder.asUint8Array(); // Of type `Uint8Array`.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="PHP">}}
{{< highlight php >}}
// This must be called after `finish()`.
$buf = $builder->dataBuffer(); // Of type `Google\FlatBuffers\ByteBuffer`
// The data in this ByteBuffer does NOT start at 0, but at buf->getPosition().
// The end of the data is marked by buf->capacity(), so the size is
// buf->capacity() - buf->getPosition().
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Dart">}}
{{< highlight dart >}}
final Uint8List buf = builder.finish(orc);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lua">}}
{{< highlight lua >}}
-- Get the flatbuffer as a string containing the binary data
local bufAsString = builder:Output()
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lobster">}}
{{< highlight lobster >}}
// This must be called after `Finish()`.
let buf = builder.SizedCopy() // Of type `string`.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Rust">}}
{{< highlight rust >}}
// This must be called after `finish()`.
// `finished_data` returns a byte slice.
let buf = builder.finished_data(); // Of type `&[u8]`
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Swift">}}
{{< highlight swift >}}
// This must be called after `finish()`.
// `sizedByteArray` returns the finished buf of type [UInt8].
let buf = builder.sizedByteArray
// or you can use to get an object of type Data
let bufData = ByteBuffer(data: builder.data)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

Now you can write the bytes to a file or send them over the network. Make sure
your file mode (or transfer protocol) is set to BINARY, not text. If you
transfer a FlatBuffer in text mode, the buffer will be corrupted, which will
lead to hard to find problems when you read the buffer.

### Reading Orc FlatBuffers

Now that we have successfully created an Orc FlatBuffer, the monster data can
be saved, sent over a network, etc. Let's now adventure into the inverse, and
access a FlatBuffer.

This section requires the same import/include, namespace, etc. requirements as
before:

{{< code-snippet-group groupId="tutorial">}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C++">}}
{{< highlight cpp >}}
#include "monster_generated.h" // This was generated by `flatc`.

using namespace MyGame::Sample; // Specified in the schema.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Java">}}
{{< highlight java >}}
import MyGame.Sample.*; //The `flatc` generated files. (Monster, Vec3, etc.)
 
import com.google.flatbuffers.FlatBufferBuilder;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Kotlin">}}
{{< highlight kotlin >}}
import MyGame.Sample.* //The `flatc` generated files. (Monster, Vec3, etc.)
 
import com.google.flatbuffers.FlatBufferBuilder
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C#">}}
{{< highlight csharp >}}
using FlatBuffers;
using MyGame.Sample; // The `flatc` generated files. (Monster, Vec3, etc.)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Go">}}
{{< highlight go >}}
import (
    flatbuffers "github.com/google/flatbuffers/go"
    sample "MyGame/Sample"
)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Python">}}
{{< highlight python >}}
import flatbuffers
 
# Generated by `flatc`.
import MyGame.Sample.Any
import MyGame.Sample.Color
import MyGame.Sample.Monster
import MyGame.Sample.Vec3
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Javascript">}}
{{< highlight javascript >}}
// The following code is an example - use your desired module flavor by transpiling from TS. 
var flatbuffers = require('/js/flatbuffers').flatbuffers;
var MyGame = require('./monster_generated').MyGame; // Generated by `flatc`.
 
//--------------------------------------------------------------------------//
 
// The following code an example for browser-based HTML/JavaScript. Use the above code
// for JavaScript module loaders (e.g. Node.js).
<script src="../js/flatbuffers.js"></script>
<script src="monster_generated.js"></script> // Generated by `flatc`.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Typescript">}}
{{< highlight typescript >}}
// note: import flatbuffers with your desired import method
 
// note: the `./monster_generated.ts` file was previously generated by `flatc` above using the `monster.fbs` schema
import { MyGame } from './monster_generated';
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="PHP">}}
{{< highlight php >}}
// It is recommended that your use PSR autoload when using FlatBuffers in PHP.
// Here is an example from `SampleBinary.php`:
function __autoload($class_name) {
  // The last segment of the class name matches the file name.
  $class = substr($class_name, strrpos($class_name, "\\") + 1);
  $root_dir = join(DIRECTORY_SEPARATOR, array(dirname(dirname(__FILE__)))); // `flatbuffers` root.
 
  // Contains the `*.php` files for the FlatBuffers library and the `flatc` generated files.
  $paths = array(join(DIRECTORY_SEPARATOR, array($root_dir, "php")),
                 join(DIRECTORY_SEPARATOR, array($root_dir, "samples", "MyGame", "Sample")));
  foreach ($paths as $path) {
    $file = join(DIRECTORY_SEPARATOR, array($path, $class . ".php"));
    if (file_exists($file)) {
      require($file);
      break;
    }
  }
}
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Dart">}}
{{< highlight dart >}}
import 'package:flat_buffers/flat_buffers.dart' as fb;
import './monster_my_game.sample_generated.dart' as myGame;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lua">}}
{{< highlight lua >}}
-- require the flatbuffers module
local flatbuffers = require("flatbuffers")
 
-- require the generated files from `flatc`.
local color = require("MyGame.Sample.Color")
local equipment = require("MyGame.Sample.Equipment")
local monster = require("MyGame.Sample.Monster")
local vec3 = require("MyGame.Sample.Vec3")
local weapon = require("MyGame.Sample.Weapon")
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lobster">}}
{{< highlight lobster >}}
import from "../lobster/"  // Where to find flatbuffers.lobster
import monster_generated
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Rust">}}
{{< highlight rust >}}
// import the flatbuffers runtime library
extern crate flatbuffers;
 
// import the generated code
#[allow(dead_code, unused_imports)]
#[path = "./monster_generated.rs"]
mod monster_generated;
pub use monster_generated::my_game::sample::{get_root_as_monster,
                                             Color, Equipment,
                                             Monster, MonsterArgs,
                                             Vec3,
                                             Weapon, WeaponArgs};
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Swift">}}
{{< highlight swift >}}
/**
// make sure that monster_generated.swift is included in your project
*/
import Flatbuffers
 
// typealiases for convenience
typealias Monster = MyGame1_Sample_Monster
typealias Weapon = MyGame1_Sample_Weapon
typealias Color = MyGame1_Sample_Color
typealias Vec3 = MyGame1_Sample_Vec3
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

Then, assuming you have a buffer of bytes received from disk, network, etc.,
you can start accessing the buffer like so:

**Again, make sure you read the bytes in BINARY mode, otherwise the code below
won't work.**

{{< code-snippet-group groupId="tutorial">}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C++">}}
{{< highlight cpp >}}
uint8_t *buffer_pointer = /* the data you just read */;
 
// Get a pointer to the root object inside the buffer.
auto monster = GetMonster(buffer_pointer);
 
// `monster` is of type `Monster *`.
// Note: root object pointers are NOT the same as `buffer_pointer`.
// `GetMonster` is a convenience function that calls `GetRoot<Monster>`,
// the latter is also available for non-root types.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Java">}}
{{< highlight java >}}
byte[] bytes = /* the data you just read */
java.nio.ByteBuffer buf = java.nio.ByteBuffer.wrap(bytes);
 
// Get an accessor to the root object inside the buffer.
Monster monster = Monster.getRootAsMonster(buf);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Kotlin">}}
{{< highlight kotlin >}}
val bytes = /* the data you just read */
val buf = java.nio.ByteBuffer.wrap(bytes)
 
// Get an accessor to the root object inside the buffer.
Monster monster = Monster.getRootAsMonster(buf)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C#">}}
{{< highlight csharp >}}
byte[] bytes = /* the data you just read */
var buf = new ByteBuffer(bytes);
 
// Get an accessor to the root object inside the buffer.
var monster = Monster.GetRootAsMonster(buf);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Go">}}
{{< highlight go >}}
var buf []byte = /* the data you just read */
 
// Get an accessor to the root object inside the buffer.
monster := sample.GetRootAsMonster(buf, 0)
 
// Note: We use `0` for the offset here, which is typical for most buffers
// you would read. If you wanted to read from `builder.Bytes` directly, you
// would need to pass in the offset of `builder.Head()`, as the builder
// constructs the buffer backwards, so may not start at offset 0.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Python">}}
{{< highlight python >}}
buf = /* the data you just read, in an object of type "bytearray" */
 
// Get an accessor to the root object inside the buffer.
monster = MyGame.Sample.Monster.Monster.GetRootAs(buf, 0)
 
# Note: We use `0` for the offset here, which is typical for most buffers
# you would read.  If you wanted to read from the `builder.Bytes` directly,
# you would need to pass in the offset of `builder.Head()`, as the builder
# constructs the buffer backwards, so may not start at offset 0.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Javascript">}}
{{< highlight javascript >}}
// the data you just read, as a `Uint8Array`
// Note that the example here uses `readFileSync` from the built-in `fs` module,
// but other methods for accessing the file contents will also work.
var bytes = new Uint8Array(readFileSync('./monsterdata.bin'));
 
var buf = new flatbuffers.ByteBuffer(bytes);
 
// Get an accessor to the root object inside the buffer.
var monster = MyGame.Sample.Monster.getRootAsMonster(buf);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Typescript">}}
{{< highlight typescript >}}
// the data you just read, as a `Uint8Array`.
// Note that the example here uses `readFileSync` from the built-in `fs` module,
// but other methods for accessing the file contents will also work.
let bytes = new Uint8Array(readFileSync('./monsterdata.bin'));
 
let buf = new flatbuffers.ByteBuffer(bytes);
 
// Get an accessor to the root object inside the buffer.
let monster = MyGame.Sample.Monster.getRootAsMonster(buf);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="PHP">}}
{{< highlight php >}}
$bytes = /* the data you just read, in a string */
$buf = Google\FlatBuffers\ByteBuffer::wrap($bytes);
 
// Get an accessor to the root object inside the buffer.
$monster = \MyGame\Sample\Monster::GetRootAsMonster($buf);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Dart">}}
{{< highlight dart >}}
List<int> data = ... // the data, e.g. from file or network
// A generated factory constructor that will read the data.
myGame.Monster monster = new myGame.Monster(data);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lua">}}
{{< highlight lua >}}
local bufAsString =   -- The data you just read in
 
-- Convert the string representation into binary array Lua structure
local buf = flatbuffers.binaryArray.New(bufAsString)
 
-- Get an accessor to the root object insert the buffer
local mon = monster.GetRootAsMonster(buf, 0)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lobster">}}
{{< highlight lobster >}}
buf = /* the data you just read, in a string */
 
// Get an accessor to the root object inside the buffer.
let monster = MyGame_Sample_GetRootAsMonster(buf)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Rust">}}
{{< highlight rust >}}
let buf = /* the data you just read, in a &[u8] */
 
// Get an accessor to the root object inside the buffer.
let monster = get_root_as_monster(buf);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Swift">}}
{{< highlight swift >}}
// create a ByteBuffer(:) from an [UInt8] or Data()
let buf = // Get your data
 
// Get an accessor to the root object inside the buffer.
let monster = Monster.getRootAsMonster(bb: ByteBuffer(bytes: buf))
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

If you look in the generated files from the schema compiler, you will see it
generated accessors for all non-deprecated fields. For example:

{{< code-snippet-group groupId="tutorial">}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C++">}}
{{< highlight cpp >}}
auto hp = monster->hp();
auto mana = monster->mana();
auto name = monster->name()->c_str();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Java">}}
{{< highlight java >}}
short hp = monster.hp();
short mana = monster.mana();
String name = monster.name();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Kotlin">}}
{{< highlight kotlin >}}
val hp = monster.hp
val mana = monster.mana
val name = monster.name
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C#">}}
{{< highlight csharp >}}
// For C#, unlike most other languages support by FlatBuffers, most values (except for
// vectors and unions) are available as properties instead of accessor methods.
var hp = monster.Hp
var mana = monster.Mana
var name = monster.Name
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Go">}}
{{< highlight go >}}
hp := monster.Hp()
mana := monster.Mana()
name := string(monster.Name()) // Note: `monster.Name()` returns a byte[].
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Python">}}
{{< highlight python >}}
hp = monster.Hp()
mana = monster.Mana()
name = monster.Name()
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Javascript">}}
{{< highlight javascript >}}
var hp = monster.hp();
var mana = monster.mana();
var name = monster.name();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Typescript">}}
{{< highlight typescript >}}
let hp = monster.hp();
let mana = monster.mana();
let name = monster.name();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="PHP">}}
{{< highlight php >}}
$hp = $monster->getHp();
$mana = $monster->getMana();
$name = monster->getName();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Dart">}}
{{< highlight dart >}}
// For Dart, unlike other languages support by FlatBuffers, most values
// are available as properties instead of accessor methods.
var hp = monster.hp;
var mana = monster.mana;
var name = monster.name;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lua">}}
{{< highlight lua >}}
local hp = mon:Hp()
local mana = mon:Mana()
local name = mon:Name()
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lobster">}}
{{< highlight lobster >}}
let hp = monster.hp
let mana = monster.mana
let name = monster.name
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Rust">}}
{{< highlight rust >}}
// Get and test some scalar types from the FlatBuffer.
let hp = monster.hp();
let mana = monster.mana();
let name = monster.name();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Swift">}}
{{< highlight swift >}}
let hp = monster.hp
let mana = monster.mana
let name = monster.name // returns an optional string
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

These should hold 300, 150, and "Orc" respectively.

Note: The default value 150 wasn't stored in mana, but we are still able to
retrieve it.

To access sub-objects, in the case of our pos, which is a Vec3:

{{< code-snippet-group groupId="tutorial">}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C++">}}
{{< highlight cpp >}}
auto pos = monster->pos();
auto x = pos->x();
auto y = pos->y();
auto z = pos->z();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Java">}}
{{< highlight java >}}
Vec3 pos = monster.pos();
float x = pos.x();
float y = pos.y();
float z = pos.z();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Kotlin">}}
{{< highlight kotlin >}}
val pos = monster.pos!!
val x = pos.x
val y = pos.y
val z = pos.z
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C#">}}
{{< highlight csharp >}}
var pos = monster.Pos.Value;
var x = pos.X;
var y = pos.Y;
var z = pos.Z;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Go">}}
{{< highlight go >}}
pos := monster.Pos(nil)
x := pos.X()
y := pos.Y()
z := pos.Z()
 
// Note: Whenever you access a new object, like in `Pos()`, a new temporary
// accessor object gets created. If your code is very performance sensitive,
// you can pass in a pointer to an existing `Vec3` instead of `nil`. This
// allows you to reuse it across many calls to reduce the amount of object
// allocation/garbage collection.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Python">}}
{{< highlight python >}}
pos = monster.Pos()
x = pos.X()
y = pos.Y()
z = pos.Z()
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Javascript">}}
{{< highlight javascript >}}
var pos = monster.pos();
var x = pos.x();
var y = pos.y();
var z = pos.z();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Typescript">}}
{{< highlight typescript >}}
let pos = monster.pos();
let x = pos.x();
let y = pos.y();
let z = pos.z();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="PHP">}}
{{< highlight php >}}
$pos = $monster->getPos();
$x = $pos->getX();
$y = $pos->getY();
$z = $pos->getZ();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Dart">}}
{{< highlight dart >}}
myGame.Vec3 pos = monster.pos;
double x = pos.x;
double y = pos.y;
double z = pos.z;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lua">}}
{{< highlight lua >}}
local pos = mon:Pos()
local x = pos:X()
local y = pos:Y()
local z = pos:Z()
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lobster">}}
{{< highlight lobster >}}
let pos = monster.pos
let x = pos.x
let y = pos.y
let z = pos.z
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Rust">}}
{{< highlight rust >}}
let pos = monster.pos().unwrap();
let x = pos.x();
let y = pos.y();
let z = pos.z();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Swift">}}
{{< highlight swift >}}
let pos = monster.pos
let x = pos.x
let y = pos.y
let z = pos.z
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

x, y, and z will contain 1.0, 2.0, and 3.0, respectively.

Note: Had we not set pos during serialization, it would be a null-value.

Similarly, we can access elements of the inventory vector by indexing it.
You can also iterate over the length of the array/vector representing the
FlatBuffers vector.

{{< code-snippet-group groupId="tutorial">}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C++">}}
{{< highlight cpp >}}
auto inv = monster->inventory(); // A pointer to a `flatbuffers::Vector<>`.
auto inv_len = inv->size();
auto third_item = inv->Get(2);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Java">}}
{{< highlight java >}}
int invLength = monster.inventoryLength();
byte thirdItem = monster.inventory(2);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Kotlin">}}
{{< highlight kotlin >}}
val invLength = monster.inventoryLength
val thirdItem = monster.inventory(2)!!
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C#">}}
{{< highlight csharp >}}
int invLength = monster.InventoryLength;
var thirdItem = monster.Inventory(2);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Go">}}
{{< highlight go >}}
invLength := monster.InventoryLength()
thirdItem := monster.Inventory(2)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Python">}}
{{< highlight python >}}
inv_len = monster.InventoryLength()
third_item = monster.Inventory(2)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Javascript">}}
{{< highlight javascript >}}
var invLength = monster.inventoryLength();
var thirdItem = monster.inventory(2);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Typescript">}}
{{< highlight typescript >}}
let invLength = monster.inventoryLength();
let thirdItem = monster.inventory(2);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="PHP">}}
{{< highlight php >}}
$inv_len = $monster->getInventoryLength();
$third_item = $monster->getInventory(2);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Dart">}}
{{< highlight dart >}}
int invLength = monster.inventory.length;
var thirdItem = monster.inventory[2];
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lua">}}
{{< highlight lua >}}
local invLength = mon:InventoryLength()
local thirdItem = mon:Inventory(3) -- Lua is 1-based
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lobster">}}
{{< highlight lobster >}}
let inv_len = monster.inventory_length
let third_item = monster.inventory(2)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Rust">}}
{{< highlight rust >}}
// Get and test an element from the `inventory` FlatBuffer's `vector`.
let inv = monster.inventory().unwrap();
 
// Note that this vector is returned as a slice, because direct access for
// this type, a `u8` vector, is safe on all platforms:
let third_item = inv[2];
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Swift">}}
{{< highlight swift >}}
// Get a the count of objects in the vector
let count = monster.inventoryCount
 
// get item at index 4
let object = monster.inventory(at: 4)
 
// or you can fetch the entire array
let inv = monster.inventory
// inv[4] should equal object
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

For vectors of tables, you can access the elements like any other vector,
except you need to handle the result as a FlatBuffer table:

{{< code-snippet-group groupId="tutorial">}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C++">}}
{{< highlight cpp >}}
auto weapons = monster->weapons(); // A pointer to a `flatbuffers::Vector<>`.
auto weapon_len = weapons->size();
auto second_weapon_name = weapons->Get(1)->name()->str();
auto second_weapon_damage = weapons->Get(1)->damage();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Java">}}
{{< highlight java >}}
int weaponsLength = monster.weaponsLength();
String secondWeaponName = monster.weapons(1).name();
short secondWeaponDamage = monster.weapons(1).damage();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Kotlin">}}
{{< highlight kotlin >}}
val weaponsLength = monster.weaponsLength
val secondWeaponName = monster.weapons(1)!!.name
val secondWeaponDamage = monster.weapons(1)!!.damage
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C#">}}
{{< highlight csharp >}}
int weaponsLength = monster.WeaponsLength;
var secondWeaponName = monster.Weapons(1).Name;
var secondWeaponDamage = monster.Weapons(1).Damage;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Go">}}
{{< highlight go >}}
weaponLength := monster.WeaponsLength()
weapon := new(sample.Weapon) // We need a `sample.Weapon` to pass into `monster.Weapons()`
                             // to capture the output of the function.
if monster.Weapons(weapon, 1) {
        secondWeaponName := weapon.Name()
        secondWeaponDamage := weapon.Damage()
}
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Python">}}
{{< highlight python >}}
weapons_length = monster.WeaponsLength()
second_weapon_name = monster.Weapons(1).Name()
second_weapon_damage = monster.Weapons(1).Damage()
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Javascript">}}
{{< highlight javascript >}}
var weaponsLength = monster.weaponsLength();
var secondWeaponName = monster.weapons(1).name();
var secondWeaponDamage = monster.weapons(1).damage();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Typescript">}}
{{< highlight typescript >}}
let weaponsLength = monster.weaponsLength();
let secondWeaponName = monster.weapons(1).name();
let secondWeaponDamage = monster.weapons(1).damage();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="PHP">}}
{{< highlight php >}}
$weapons_len = $monster->getWeaponsLength();
$second_weapon_name = $monster->getWeapons(1)->getName();
$second_weapon_damage = $monster->getWeapons(1)->getDamage();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Dart">}}
{{< highlight dart >}}
int weaponsLength = monster.weapons.length;
var secondWeaponName = monster.weapons[1].name;
var secondWeaponDamage = monster.Weapons[1].damage;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lua">}}
{{< highlight lua >}}
local weaponsLength = mon:WeaponsLength()
local secondWeaponName = mon:Weapon(2):Name()
local secondWeaponDamage = mon:Weapon(2):Damage()
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lobster">}}
{{< highlight lobster >}}
let weapons_length = monster.weapons_length
let second_weapon_name = monster.weapons(1).name
let second_weapon_damage = monster.weapons(1).damage
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Rust">}}
{{< highlight rust >}}
// Get and test the `weapons` FlatBuffers's `vector`.
let weps = monster.weapons().unwrap();
let weps_len = weps.len();
 
let wep2 = weps.get(1);
let second_weapon_name = wep2.name();
let second_weapon_damage = wep2.damage();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Swift">}}
{{< highlight swift >}}
// Get the count of weapon objects
let wepsCount = monster.weaponsCount
 
let weapon2 = monster.weapons(at: 1)
let weaponName = weapon2.name
let weaponDmg = weapon2.damage
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

Last, we can access our Equipped FlatBuffer union. Just like when we created
the union, we need to get both parts of the union: the type and the data.

We can access the type to dynamically cast the data as needed (since the union
only stores a FlatBuffer table).

{{< code-snippet-group groupId="tutorial">}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C++">}}
{{< highlight cpp >}}
auto union_type = monster.equipped_type();
 
if (union_type == Equipment_Weapon) {
  auto weapon = static_cast<const Weapon*>(monster->equipped()); // Requires `static_cast`
                                                                 // to type `const Weapon*`.

  auto weapon_name = weapon->name()->str(); // "Axe"
  auto weapon_damage = weapon->damage();    // 5
}
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Java">}}
{{< highlight java >}}
int unionType = monster.EquippedType();
 
if (unionType == Equipment.Weapon) {
  Weapon weapon = (Weapon)monster.equipped(new Weapon()); // Requires explicit cast
                                                          // to `Weapon`.
 
  String weaponName = weapon.name();    // "Axe"
  short weaponDamage = weapon.damage(); // 5
}
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Kotlin">}}
{{< highlight kotlin >}}
val unionType = monster.EquippedType
 
if (unionType == Equipment.Weapon) {
  val weapon = monster.equipped(Weapon()) as Weapon // Requires explicit cast
                                                          // to `Weapon`.
 
  val weaponName = weapon.name   // "Axe"
  val weaponDamage = weapon.damage // 5
}
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C#">}}
{{< highlight csharp >}}
var unionType = monster.EquippedType;
 
if (unionType == Equipment.Weapon) {
  var weapon = monster.Equipped<Weapon>().Value;
 
  var weaponName = weapon.Name;     // "Axe"
  var weaponDamage = weapon.Damage; // 5
}
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Go">}}
{{< highlight go >}}
// We need a `flatbuffers.Table` to capture the output of the
// `monster.Equipped()` function.
unionTable := new(flatbuffers.Table)
 
if monster.Equipped(unionTable) {
        unionType := monster.EquippedType()
 
        if unionType == sample.EquipmentWeapon {
                // Create a `sample.Weapon` object that can be initialized with the contents
                // of the `flatbuffers.Table` (`unionTable`), which was populated by
                // `monster.Equipped()`.
                unionWeapon = new(sample.Weapon)
                unionWeapon.Init(unionTable.Bytes, unionTable.Pos)
 
                weaponName = unionWeapon.Name()
                weaponDamage = unionWeapon.Damage()
        }
}
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Python">}}
{{< highlight python >}}
union_type = monster.EquippedType()
 
if union_type == MyGame.Sample.Equipment.Equipment().Weapon:
  # `monster.Equipped()` returns a `flatbuffers.Table`, which can be used to
  # initialize a `MyGame.Sample.Weapon.Weapon()`.
  union_weapon = MyGame.Sample.Weapon.Weapon()
  union_weapon.Init(monster.Equipped().Bytes, monster.Equipped().Pos)
 
  weapon_name = union_weapon.Name()     // 'Axe'
  weapon_damage = union_weapon.Damage() // 5
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Javascript">}}
{{< highlight javascript >}}
var unionType = monster.equippedType();
 
if (unionType == MyGame.Sample.Equipment.Weapon) {
  var weaponName = monster.equipped(new MyGame.Sample.Weapon()).name();     // 'Axe'
  var weaponDamage = monster.equipped(new MyGame.Sample.Weapon()).damage(); // 5
}
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Typescript">}}
{{< highlight typescript >}}
let unionType = monster.equippedType();
 
if (unionType == MyGame.Sample.Equipment.Weapon) {
  let weaponName = monster.equipped(new MyGame.Sample.Weapon()).name();     // 'Axe'
  let weaponDamage = monster.equipped(new MyGame.Sample.Weapon()).damage(); // 5
}
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="PHP">}}
{{< highlight php >}}
$union_type = $monster->getEquippedType();
 
if ($union_type == \MyGame\Sample\Equipment::Weapon) {
  $weapon_name = $monster->getEquipped(new \MyGame\Sample\Weapon())->getName();     // "Axe"
  $weapon_damage = $monster->getEquipped(new \MyGame\Sample\Weapon())->getDamage(); // 5
}
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Dart">}}
{{< highlight dart >}}
var unionType = monster.equippedType.value;
 
if (unionType == myGame.EquipmentTypeId.Weapon.value) {
  myGame.Weapon weapon = mon.equipped as myGame.Weapon;
 
  var weaponName = weapon.name;     // "Axe"
  var weaponDamage = weapon.damage; // 5
}
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lua">}}
{{< highlight lua >}}
local unionType = mon:EquippedType()
 
if unionType == equipment.Weapon then
  local unionWeapon = weapon.New()
  unionWeapon:Init(mon:Equipped().bytes, mon:Equipped().pos)
 
  local weaponName = unionWeapon:Name()     -- 'Axe'
  local weaponDamage = unionWeapon:Damage() -- 5
end
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lobster">}}
{{< highlight lobster >}}
union_type = monster.equipped_type
 
if union_type == MyGame_Sample_Equipment_Weapon:
    // `monster.equipped_as_Weapon` returns a FlatBuffer handle much like normal table fields,
    // but this is only valid to call if we already know it is the correct type.
    let union_weapon = monster.equipped_as_Weapon
 
    let weapon_name = union_weapon.name     // "Axe"
    let weapon_damage = union_weapon.damage // 5
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Rust">}}
{{< highlight rust >}}
// Get and test the `Equipment` union (`equipped` field).
// `equipped_as_weapon` returns a FlatBuffer handle much like normal table
// fields, but this will return `None` if the union is not actually of that
// type.
if monster.equipped_type() == Equipment::Weapon {
  let equipped = monster.equipped_as_weapon().unwrap();
  let weapon_name = equipped.name();
  let weapon_damage = equipped.damage();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Swift">}}
{{< highlight swift >}}
// Get and check if the monster has an equipped item
if monster.equippedType == .weapon {
  let _weapon = monster.equipped(type: Weapon.self)
  let name = _weapon.name // should return "Axe"
  let dmg = _weapon.damage // should return 5
}
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

## Mutating FlatBuffers

As you saw above, typically once you have created a FlatBuffer, it is read-only
from that moment on. There are, however, cases where you have just received a
FlatBuffer, and you'd like to modify something about it before sending it on to
another recipient. With the above functionality, you'd have to generate an
entirely new FlatBuffer, while tracking what you modified in your own data
structures. This is inconvenient.

For this reason FlatBuffers can also be mutated in-place. While this is great
for making small fixes to an existing buffer, you generally want to create
buffers from scratch whenever possible, since it is much more efficient and
the API is much more general purpose.

To get non-const accessors, invoke flatc with --gen-mutable.

Similar to how we read fields using the accessors above, we can now use the
mutators like so:

{{< code-snippet-group groupId="tutorial">}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C++">}}
{{< highlight cpp >}}
auto monster = GetMutableMonster(buffer_pointer);  // non-const
monster->mutate_hp(10);                      // Set the table `hp` field.
monster->mutable_pos()->mutate_z(4);         // Set struct field.
monster->mutable_inventory()->Mutate(0, 1);  // Set vector element.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Java">}}
{{< highlight java >}}
Monster monster = Monster.getRootAsMonster(buf);
monster.mutateHp(10);            // Set table field.
monster.pos().mutateZ(4);        // Set struct field.
monster.mutateInventory(0, 1);   // Set vector element.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Kotlin">}}
{{< highlight kotlin >}}
val monster = Monster.getRootAsMonster(buf)
monster.mutateHp(10)            // Set table field.
monster.pos!!.mutateZ(4)        // Set struct field.
monster.mutateInventory(0, 1)   // Set vector element.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="C#">}}
{{< highlight csharp >}}
var monster = Monster.GetRootAsMonster(buf);
monster.MutateHp(10);            // Set table field.
monster.Pos.MutateZ(4);          // Set struct field.
monster.MutateInventory(0, 1);   // Set vector element.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Go">}}
{{< highlight go >}}
// API for mutating FlatBuffers is not yet available in Go.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Python">}}
{{< highlight python >}}
# API for mutating FlatBuffers is not yet available in Python.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Javascript">}}
{{< highlight javascript >}}
// API for mutating FlatBuffers is not yet supported in JavaScript.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Typescript">}}
{{< highlight typescript >}}
// API for mutating FlatBuffers is not yet supported in TypeScript.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="PHP">}}
{{< highlight php >}}
// API for mutating FlatBuffers is not yet supported in PHP.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Dart">}}
{{< highlight dart >}}
/* API for mutating FlatBuffers not yet available in Dart. */
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lua">}}
{{< highlight lua >}}
-- API for mutating FlatBuffers is not yet available in Lua.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Lobster">}}
{{< highlight lobster >}}
// API for mutating FlatBuffers is not yet available in Lobster.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Rust">}}
{{< highlight rust >}}
// API for mutating FlatBuffers is not yet available in Rust.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="tutorial" tabName="Swift">}}
{{< highlight swift >}}
let monster = Monster.getRootAsMonster(bb: ByteBuffer(bytes: buf))
monster.mutate(hp: 10) // mutates a value in a table
/// to mutate structs in swift you have to use the mutable accessors
monster.mutablePos.mutate(z: 4) // mutates a value in a struct
monster.mutate(inventory: 6, at index: 0) // mutates a value in an Scalar array
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

We use the somewhat verbose term mutate instead of set to indicate that this is
a special use case, not to be confused with the default way of constructing
FlatBuffer data.

After the above mutations, you can send on the FlatBuffer to a new recipient
without any further work!

Note that any mutate functions on a table will return a boolean, which is false
if the field we're trying to set is not present in the buffer. Fields are not
present if they weren't set, or even if they happen to be equal to the default
value. For example, in the creation code above, the mana field is equal to 150,
which is the default value, so it was never stored in the buffer. Trying to
call the corresponding mutate method for mana on such data will return false,
and the value won't actually be modified!

One way to solve this is to call ForceDefaults on a FlatBufferBuilder to force
all fields you set to actually be written. This, of course, increases the size
of the buffer somewhat, but this may be acceptable for a mutable buffer.

If this is not sufficient, other ways of mutating FlatBuffers may be supported
in your language through an object based API (--gen-object-api) or reflection.
See the individual language documents for support.
