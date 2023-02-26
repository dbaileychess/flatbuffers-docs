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


{{< code-snippet-group groupId="buildSchema">}}

{{< code-snippet-group-observer groupId="buildSchema" tabName="C++">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --cpp monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="buildSchema" tabName="Java">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --java monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="buildSchema" tabName="Kotlin">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --kotlin monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="buildSchema" tabName="C#">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --csharp monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="buildSchema" tabName="Go">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --go monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="buildSchema" tabName="Python">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --python monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="buildSchema" tabName="Javascript">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
# customize your TS -> JS transpilation
tsc monster_generated.ts
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="buildSchema" tabName="Typescript">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="buildSchema" tabName="PHP">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --php monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="buildSchema" tabName="Dart">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --dart monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="buildSchema" tabName="Lua">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --lua monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="buildSchema" tabName="Lobster">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --lobster monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="buildSchema" tabName="Rust">}}
{{< highlight bash >}}
cd flatbuffers/samples
./../flatc --rust monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="buildSchema" tabName="Swift">}}
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

{{< code-snippet-group groupId="importGenerated">}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C++">}}
{{< highlight cpp >}}
#include "monster_generated.h" // This was generated by `flatc`.

using namespace MyGame::Sample; // Specified in the schema.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Java">}}
{{< highlight java >}}
import MyGame.Sample.*; //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Kotlin">}}
{{< highlight kotlin >}}
import MyGame.Sample.* //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C#">}}
{{< highlight csharp >}}
using FlatBuffers;
using MyGame.Sample; // The `flatc` generated files. (Monster, Vec3, etc.)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Go">}}
{{< highlight go >}}
import (
    flatbuffers "github.com/google/flatbuffers/go"
    sample "MyGame/Sample"
)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Python">}}
{{< highlight python >}}
cd flatbuffers/samples
./../flatc --python monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Javascript">}}
{{< highlight javascript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
# customize your TS -> JS transpilation
tsc monster_generated.ts
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Typescript">}}
{{< highlight typescript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="PHP">}}
{{< highlight php >}}
cd flatbuffers/samples
./../flatc --php monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Dart">}}
{{< highlight dart >}}
cd flatbuffers/samples
./../flatc --dart monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lua">}}
{{< highlight lua >}}
cd flatbuffers/samples
./../flatc --lua monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lobster">}}
{{< highlight txt >}}
cd flatbuffers/samples
./../flatc --lobster monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Rust">}}
{{< highlight rust >}}
cd flatbuffers/samples
./../flatc --rust monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Swift">}}
{{< highlight swift >}}
cd flatbuffers/samples
./../flatc --swift monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

Now we are ready to start building some buffers. In order to start, we need to
create an instance of the FlatBufferBuilder, which will contain the buffer as
it grows. You can pass an initial size of the buffer (here 1024 bytes), which
will grow automatically if needed:

{{< code-snippet-group groupId="importGenerated">}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C++">}}
{{< highlight cpp >}}
// Create a `FlatBufferBuilder`, which will be used to create our
// monsters' FlatBuffers.
flatbuffers::FlatBufferBuilder builder(1024);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Java">}}
{{< highlight java >}}
import MyGame.Sample.*; //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Kotlin">}}
{{< highlight kotlin >}}
import MyGame.Sample.* //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C#">}}
{{< highlight csharp >}}
using FlatBuffers;
using MyGame.Sample; // The `flatc` generated files. (Monster, Vec3, etc.)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Go">}}
{{< highlight go >}}
import (
    flatbuffers "github.com/google/flatbuffers/go"
    sample "MyGame/Sample"
)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Python">}}
{{< highlight python >}}
cd flatbuffers/samples
./../flatc --python monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Javascript">}}
{{< highlight javascript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
# customize your TS -> JS transpilation
tsc monster_generated.ts
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Typescript">}}
{{< highlight typescript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="PHP">}}
{{< highlight php >}}
cd flatbuffers/samples
./../flatc --php monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Dart">}}
{{< highlight dart >}}
cd flatbuffers/samples
./../flatc --dart monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lua">}}
{{< highlight lua >}}
cd flatbuffers/samples
./../flatc --lua monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lobster">}}
{{< highlight txt >}}
cd flatbuffers/samples
./../flatc --lobster monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Rust">}}
{{< highlight rust >}}
cd flatbuffers/samples
./../flatc --rust monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Swift">}}
{{< highlight swift >}}
cd flatbuffers/samples
./../flatc --swift monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

After creating the builder, we can start serializing our data. Before we make
our orc Monster, let's create some Weapons: a Sword and an Axe.

{{< code-snippet-group groupId="importGenerated">}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C++">}}
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

{{< code-snippet-group-observer groupId="importGenerated" tabName="Java">}}
{{< highlight java >}}
import MyGame.Sample.*; //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Kotlin">}}
{{< highlight kotlin >}}
import MyGame.Sample.* //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C#">}}
{{< highlight csharp >}}
using FlatBuffers;
using MyGame.Sample; // The `flatc` generated files. (Monster, Vec3, etc.)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Go">}}
{{< highlight go >}}
import (
    flatbuffers "github.com/google/flatbuffers/go"
    sample "MyGame/Sample"
)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Python">}}
{{< highlight python >}}
cd flatbuffers/samples
./../flatc --python monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Javascript">}}
{{< highlight javascript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
# customize your TS -> JS transpilation
tsc monster_generated.ts
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Typescript">}}
{{< highlight typescript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="PHP">}}
{{< highlight php >}}
cd flatbuffers/samples
./../flatc --php monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Dart">}}
{{< highlight dart >}}
cd flatbuffers/samples
./../flatc --dart monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lua">}}
{{< highlight lua >}}
cd flatbuffers/samples
./../flatc --lua monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lobster">}}
{{< highlight txt >}}
cd flatbuffers/samples
./../flatc --lobster monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Rust">}}
{{< highlight rust >}}
cd flatbuffers/samples
./../flatc --rust monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Swift">}}
{{< highlight swift >}}
cd flatbuffers/samples
./../flatc --swift monster.fbs
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

{{< code-snippet-group groupId="importGenerated">}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C++">}}
{{< highlight cpp >}}
// Serialize a name for our monster, called "Orc".
auto name = builder.CreateString("Orc");
 
// Create a `vector` representing the inventory of the Orc. Each number
// could correspond to an item that can be claimed after he is slain.
unsigned char treasure[] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
auto inventory = builder.CreateVector(treasure, 10);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Java">}}
{{< highlight java >}}
import MyGame.Sample.*; //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Kotlin">}}
{{< highlight kotlin >}}
import MyGame.Sample.* //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C#">}}
{{< highlight csharp >}}
using FlatBuffers;
using MyGame.Sample; // The `flatc` generated files. (Monster, Vec3, etc.)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Go">}}
{{< highlight go >}}
import (
    flatbuffers "github.com/google/flatbuffers/go"
    sample "MyGame/Sample"
)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Python">}}
{{< highlight python >}}
cd flatbuffers/samples
./../flatc --python monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Javascript">}}
{{< highlight javascript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
# customize your TS -> JS transpilation
tsc monster_generated.ts
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Typescript">}}
{{< highlight typescript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="PHP">}}
{{< highlight php >}}
cd flatbuffers/samples
./../flatc --php monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Dart">}}
{{< highlight dart >}}
cd flatbuffers/samples
./../flatc --dart monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lua">}}
{{< highlight lua >}}
cd flatbuffers/samples
./../flatc --lua monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lobster">}}
{{< highlight txt >}}
cd flatbuffers/samples
./../flatc --lobster monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Rust">}}
{{< highlight rust >}}
cd flatbuffers/samples
./../flatc --rust monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Swift">}}
{{< highlight swift >}}
cd flatbuffers/samples
./../flatc --swift monster.fbs
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

{{< code-snippet-group groupId="importGenerated">}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C++">}}
{{< highlight cpp >}}
// Place the weapons into a `std::vector`, then convert that into a FlatBuffer `vector`.
std::vector<flatbuffers::Offset<Weapon>> weapons_vector;
weapons_vector.push_back(sword);
weapons_vector.push_back(axe);
auto weapons = builder.CreateVector(weapons_vector);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Java">}}
{{< highlight java >}}
import MyGame.Sample.*; //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Kotlin">}}
{{< highlight kotlin >}}
import MyGame.Sample.* //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C#">}}
{{< highlight csharp >}}
using FlatBuffers;
using MyGame.Sample; // The `flatc` generated files. (Monster, Vec3, etc.)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Go">}}
{{< highlight go >}}
import (
    flatbuffers "github.com/google/flatbuffers/go"
    sample "MyGame/Sample"
)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Python">}}
{{< highlight python >}}
cd flatbuffers/samples
./../flatc --python monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Javascript">}}
{{< highlight javascript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
# customize your TS -> JS transpilation
tsc monster_generated.ts
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Typescript">}}
{{< highlight typescript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="PHP">}}
{{< highlight php >}}
cd flatbuffers/samples
./../flatc --php monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Dart">}}
{{< highlight dart >}}
cd flatbuffers/samples
./../flatc --dart monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lua">}}
{{< highlight lua >}}
cd flatbuffers/samples
./../flatc --lua monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lobster">}}
{{< highlight txt >}}
cd flatbuffers/samples
./../flatc --lobster monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Rust">}}
{{< highlight rust >}}
cd flatbuffers/samples
./../flatc --rust monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Swift">}}
{{< highlight swift >}}
cd flatbuffers/samples
./../flatc --swift monster.fbs
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

{{< code-snippet-group groupId="importGenerated">}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C++">}}
{{< highlight cpp >}}
Vec3 points[] = { Vec3(1.0f, 2.0f, 3.0f), Vec3(4.0f, 5.0f, 6.0f) };
auto path = builder.CreateVectorOfStructs(points, 2);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Java">}}
{{< highlight java >}}
import MyGame.Sample.*; //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Kotlin">}}
{{< highlight kotlin >}}
import MyGame.Sample.* //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C#">}}
{{< highlight csharp >}}
using FlatBuffers;
using MyGame.Sample; // The `flatc` generated files. (Monster, Vec3, etc.)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Go">}}
{{< highlight go >}}
import (
    flatbuffers "github.com/google/flatbuffers/go"
    sample "MyGame/Sample"
)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Python">}}
{{< highlight python >}}
cd flatbuffers/samples
./../flatc --python monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Javascript">}}
{{< highlight javascript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
# customize your TS -> JS transpilation
tsc monster_generated.ts
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Typescript">}}
{{< highlight typescript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="PHP">}}
{{< highlight php >}}
cd flatbuffers/samples
./../flatc --php monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Dart">}}
{{< highlight dart >}}
cd flatbuffers/samples
./../flatc --dart monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lua">}}
{{< highlight lua >}}
cd flatbuffers/samples
./../flatc --lua monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lobster">}}
{{< highlight txt >}}
cd flatbuffers/samples
./../flatc --lobster monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Rust">}}
{{< highlight rust >}}
cd flatbuffers/samples
./../flatc --rust monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Swift">}}
{{< highlight swift >}}
cd flatbuffers/samples
./../flatc --swift monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

We have now serialized the non-scalar components of the orc, so we can serialize the monster itself:

{{< code-snippet-group groupId="importGenerated">}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C++">}}
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

{{< code-snippet-group-observer groupId="importGenerated" tabName="Java">}}
{{< highlight java >}}
import MyGame.Sample.*; //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Kotlin">}}
{{< highlight kotlin >}}
import MyGame.Sample.* //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C#">}}
{{< highlight csharp >}}
using FlatBuffers;
using MyGame.Sample; // The `flatc` generated files. (Monster, Vec3, etc.)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Go">}}
{{< highlight go >}}
import (
    flatbuffers "github.com/google/flatbuffers/go"
    sample "MyGame/Sample"
)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Python">}}
{{< highlight python >}}
cd flatbuffers/samples
./../flatc --python monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Javascript">}}
{{< highlight javascript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
# customize your TS -> JS transpilation
tsc monster_generated.ts
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Typescript">}}
{{< highlight typescript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="PHP">}}
{{< highlight php >}}
cd flatbuffers/samples
./../flatc --php monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Dart">}}
{{< highlight dart >}}
cd flatbuffers/samples
./../flatc --dart monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lua">}}
{{< highlight lua >}}
cd flatbuffers/samples
./../flatc --lua monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lobster">}}
{{< highlight txt >}}
cd flatbuffers/samples
./../flatc --lobster monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Rust">}}
{{< highlight rust >}}
cd flatbuffers/samples
./../flatc --rust monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Swift">}}
{{< highlight swift >}}
cd flatbuffers/samples
./../flatc --swift monster.fbs
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

If you do not wish to set every field in a table, it may be more convenient to
manually set each field of your monster, instead of calling CreateMonster().
The following snippet is functionally equivalent to the above code, but provides
a bit more flexibility.

{{< code-snippet-group groupId="importGenerated">}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C++">}}
{{< highlight cpp >}}
// You can use this code instead of `CreateMonster()`, to create our orc
// manually.
MonsterBuilder monster_builder(builder);
monster_builder.add_pos(&position);
monster_builder.add_hp(hp);
monster_builder.add_name(name);
monster_builder.add_inventory(inventory);
monster_builder.add_color(Color_Red);
monster_builder.add_weapons(weapons);
monster_builder.add_equipped_type(Equipment_Weapon);
monster_builder.add_equipped(axe.Union());
auto orc = monster_builder.Finish();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Java">}}
{{< highlight java >}}
import MyGame.Sample.*; //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Kotlin">}}
{{< highlight kotlin >}}
import MyGame.Sample.* //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C#">}}
{{< highlight csharp >}}
using FlatBuffers;
using MyGame.Sample; // The `flatc` generated files. (Monster, Vec3, etc.)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Go">}}
{{< highlight go >}}
import (
    flatbuffers "github.com/google/flatbuffers/go"
    sample "MyGame/Sample"
)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Python">}}
{{< highlight python >}}
cd flatbuffers/samples
./../flatc --python monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Javascript">}}
{{< highlight javascript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
# customize your TS -> JS transpilation
tsc monster_generated.ts
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Typescript">}}
{{< highlight typescript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="PHP">}}
{{< highlight php >}}
cd flatbuffers/samples
./../flatc --php monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Dart">}}
{{< highlight dart >}}
cd flatbuffers/samples
./../flatc --dart monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lua">}}
{{< highlight lua >}}
cd flatbuffers/samples
./../flatc --lua monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lobster">}}
{{< highlight txt >}}
cd flatbuffers/samples
./../flatc --lobster monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Rust">}}
{{< highlight rust >}}
cd flatbuffers/samples
./../flatc --rust monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Swift">}}
{{< highlight swift >}}
cd flatbuffers/samples
./../flatc --swift monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}


Before finishing the serialization, let's take a quick look at FlatBuffer union
Equipped. There are two parts to each FlatBuffer union. The first is a hidden
field _type that is generated to hold the type of table referred to by the
union. This allows you to know which type to cast to at runtime. Second is the
union's data.

In our example, the last two things we added to our Monster were the Equipped
Type and the Equipped union itself.

Here is a repetition of these lines, to help highlight them more clearly:

{{< code-snippet-group groupId="importGenerated">}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C++">}}
{{< highlight cpp >}}
monster_builder.add_equipped_type(Equipment_Weapon); // Union type
monster_builder.add_equipped(axe.Union()); // Union data
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Java">}}
{{< highlight java >}}
import MyGame.Sample.*; //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Kotlin">}}
{{< highlight kotlin >}}
import MyGame.Sample.* //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C#">}}
{{< highlight csharp >}}
using FlatBuffers;
using MyGame.Sample; // The `flatc` generated files. (Monster, Vec3, etc.)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Go">}}
{{< highlight go >}}
import (
    flatbuffers "github.com/google/flatbuffers/go"
    sample "MyGame/Sample"
)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Python">}}
{{< highlight python >}}
cd flatbuffers/samples
./../flatc --python monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Javascript">}}
{{< highlight javascript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
# customize your TS -> JS transpilation
tsc monster_generated.ts
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Typescript">}}
{{< highlight typescript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="PHP">}}
{{< highlight php >}}
cd flatbuffers/samples
./../flatc --php monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Dart">}}
{{< highlight dart >}}
cd flatbuffers/samples
./../flatc --dart monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lua">}}
{{< highlight lua >}}
cd flatbuffers/samples
./../flatc --lua monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lobster">}}
{{< highlight txt >}}
cd flatbuffers/samples
./../flatc --lobster monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Rust">}}
{{< highlight rust >}}
cd flatbuffers/samples
./../flatc --rust monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Swift">}}
{{< highlight swift >}}
cd flatbuffers/samples
./../flatc --swift monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

After you have created your buffer, you will have the offset to the root of
the data in the orc variable, so you can finish the buffer by calling the
appropriate finish method.

{{< code-snippet-group groupId="importGenerated">}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C++">}}
{{< highlight cpp >}}
// Call `Finish()` to instruct the builder that this monster is complete.
// Note: Regardless of how you created the `orc`, you still need to call
// `Finish()` on the `FlatBufferBuilder`.
builder.Finish(orc); // You could also call `FinishMonsterBuffer(builder, orc);`.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Java">}}
{{< highlight java >}}
import MyGame.Sample.*; //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Kotlin">}}
{{< highlight kotlin >}}
import MyGame.Sample.* //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C#">}}
{{< highlight csharp >}}
using FlatBuffers;
using MyGame.Sample; // The `flatc` generated files. (Monster, Vec3, etc.)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Go">}}
{{< highlight go >}}
import (
    flatbuffers "github.com/google/flatbuffers/go"
    sample "MyGame/Sample"
)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Python">}}
{{< highlight python >}}
cd flatbuffers/samples
./../flatc --python monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Javascript">}}
{{< highlight javascript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
# customize your TS -> JS transpilation
tsc monster_generated.ts
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Typescript">}}
{{< highlight typescript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="PHP">}}
{{< highlight php >}}
cd flatbuffers/samples
./../flatc --php monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Dart">}}
{{< highlight dart >}}
cd flatbuffers/samples
./../flatc --dart monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lua">}}
{{< highlight lua >}}
cd flatbuffers/samples
./../flatc --lua monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lobster">}}
{{< highlight txt >}}
cd flatbuffers/samples
./../flatc --lobster monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Rust">}}
{{< highlight rust >}}
cd flatbuffers/samples
./../flatc --rust monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Swift">}}
{{< highlight swift >}}
cd flatbuffers/samples
./../flatc --swift monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

The buffer is now ready to be stored somewhere, sent over the network, be
compressed, or whatever you'd like to do with it. You can access the buffer
like so:

{{< code-snippet-group groupId="importGenerated">}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C++">}}
{{< highlight cpp >}}
// This must be called after `Finish()`.
uint8_t *buf = builder.GetBufferPointer();
int size = builder.GetSize(); // Returns the size of the buffer that
                              // `GetBufferPointer()` points to.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Java">}}
{{< highlight java >}}
import MyGame.Sample.*; //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Kotlin">}}
{{< highlight kotlin >}}
import MyGame.Sample.* //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C#">}}
{{< highlight csharp >}}
using FlatBuffers;
using MyGame.Sample; // The `flatc` generated files. (Monster, Vec3, etc.)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Go">}}
{{< highlight go >}}
import (
    flatbuffers "github.com/google/flatbuffers/go"
    sample "MyGame/Sample"
)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Python">}}
{{< highlight python >}}
cd flatbuffers/samples
./../flatc --python monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Javascript">}}
{{< highlight javascript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
# customize your TS -> JS transpilation
tsc monster_generated.ts
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Typescript">}}
{{< highlight typescript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="PHP">}}
{{< highlight php >}}
cd flatbuffers/samples
./../flatc --php monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Dart">}}
{{< highlight dart >}}
cd flatbuffers/samples
./../flatc --dart monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lua">}}
{{< highlight lua >}}
cd flatbuffers/samples
./../flatc --lua monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lobster">}}
{{< highlight txt >}}
cd flatbuffers/samples
./../flatc --lobster monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Rust">}}
{{< highlight rust >}}
cd flatbuffers/samples
./../flatc --rust monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Swift">}}
{{< highlight swift >}}
cd flatbuffers/samples
./../flatc --swift monster.fbs
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

{{< code-snippet-group groupId="importGenerated">}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C++">}}
{{< highlight cpp >}}
#include "monster_generated.h" // This was generated by `flatc`.

using namespace MyGame::Sample; // Specified in the schema.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Java">}}
{{< highlight java >}}
import MyGame.Sample.*; //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Kotlin">}}
{{< highlight kotlin >}}
import MyGame.Sample.* //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C#">}}
{{< highlight csharp >}}
using FlatBuffers;
using MyGame.Sample; // The `flatc` generated files. (Monster, Vec3, etc.)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Go">}}
{{< highlight go >}}
import (
    flatbuffers "github.com/google/flatbuffers/go"
    sample "MyGame/Sample"
)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Python">}}
{{< highlight python >}}
cd flatbuffers/samples
./../flatc --python monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Javascript">}}
{{< highlight javascript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
# customize your TS -> JS transpilation
tsc monster_generated.ts
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Typescript">}}
{{< highlight typescript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="PHP">}}
{{< highlight php >}}
cd flatbuffers/samples
./../flatc --php monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Dart">}}
{{< highlight dart >}}
cd flatbuffers/samples
./../flatc --dart monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lua">}}
{{< highlight lua >}}
cd flatbuffers/samples
./../flatc --lua monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lobster">}}
{{< highlight txt >}}
cd flatbuffers/samples
./../flatc --lobster monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Rust">}}
{{< highlight rust >}}
cd flatbuffers/samples
./../flatc --rust monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Swift">}}
{{< highlight swift >}}
cd flatbuffers/samples
./../flatc --swift monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

Then, assuming you have a buffer of bytes received from disk, network, etc.,
you can start accessing the buffer like so:

**Again, make sure you read the bytes in BINARY mode, otherwise the code below
won't work.**

{{< code-snippet-group groupId="importGenerated">}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C++">}}
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

{{< code-snippet-group-observer groupId="importGenerated" tabName="Java">}}
{{< highlight java >}}
import MyGame.Sample.*; //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Kotlin">}}
{{< highlight kotlin >}}
import MyGame.Sample.* //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C#">}}
{{< highlight csharp >}}
using FlatBuffers;
using MyGame.Sample; // The `flatc` generated files. (Monster, Vec3, etc.)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Go">}}
{{< highlight go >}}
import (
    flatbuffers "github.com/google/flatbuffers/go"
    sample "MyGame/Sample"
)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Python">}}
{{< highlight python >}}
cd flatbuffers/samples
./../flatc --python monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Javascript">}}
{{< highlight javascript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
# customize your TS -> JS transpilation
tsc monster_generated.ts
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Typescript">}}
{{< highlight typescript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="PHP">}}
{{< highlight php >}}
cd flatbuffers/samples
./../flatc --php monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Dart">}}
{{< highlight dart >}}
cd flatbuffers/samples
./../flatc --dart monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lua">}}
{{< highlight lua >}}
cd flatbuffers/samples
./../flatc --lua monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lobster">}}
{{< highlight txt >}}
cd flatbuffers/samples
./../flatc --lobster monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Rust">}}
{{< highlight rust >}}
cd flatbuffers/samples
./../flatc --rust monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Swift">}}
{{< highlight swift >}}
cd flatbuffers/samples
./../flatc --swift monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

If you look in the generated files from the schema compiler, you will see it
generated accessors for all non-deprecated fields. For example:

{{< code-snippet-group groupId="importGenerated">}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C++">}}
{{< highlight cpp >}}
auto hp = monster->hp();
auto mana = monster->mana();
auto name = monster->name()->c_str();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Java">}}
{{< highlight java >}}
import MyGame.Sample.*; //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Kotlin">}}
{{< highlight kotlin >}}
import MyGame.Sample.* //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C#">}}
{{< highlight csharp >}}
using FlatBuffers;
using MyGame.Sample; // The `flatc` generated files. (Monster, Vec3, etc.)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Go">}}
{{< highlight go >}}
import (
    flatbuffers "github.com/google/flatbuffers/go"
    sample "MyGame/Sample"
)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Python">}}
{{< highlight python >}}
cd flatbuffers/samples
./../flatc --python monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Javascript">}}
{{< highlight javascript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
# customize your TS -> JS transpilation
tsc monster_generated.ts
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Typescript">}}
{{< highlight typescript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="PHP">}}
{{< highlight php >}}
cd flatbuffers/samples
./../flatc --php monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Dart">}}
{{< highlight dart >}}
cd flatbuffers/samples
./../flatc --dart monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lua">}}
{{< highlight lua >}}
cd flatbuffers/samples
./../flatc --lua monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lobster">}}
{{< highlight txt >}}
cd flatbuffers/samples
./../flatc --lobster monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Rust">}}
{{< highlight rust >}}
cd flatbuffers/samples
./../flatc --rust monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Swift">}}
{{< highlight swift >}}
cd flatbuffers/samples
./../flatc --swift monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

These should hold 300, 150, and "Orc" respectively.

Note: The default value 150 wasn't stored in mana, but we are still able to
retrieve it.

To access sub-objects, in the case of our pos, which is a Vec3:

{{< code-snippet-group groupId="importGenerated">}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C++">}}
{{< highlight cpp >}}
auto pos = monster->pos();
auto x = pos->x();
auto y = pos->y();
auto z = pos->z();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Java">}}
{{< highlight java >}}
import MyGame.Sample.*; //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Kotlin">}}
{{< highlight kotlin >}}
import MyGame.Sample.* //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C#">}}
{{< highlight csharp >}}
using FlatBuffers;
using MyGame.Sample; // The `flatc` generated files. (Monster, Vec3, etc.)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Go">}}
{{< highlight go >}}
import (
    flatbuffers "github.com/google/flatbuffers/go"
    sample "MyGame/Sample"
)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Python">}}
{{< highlight python >}}
cd flatbuffers/samples
./../flatc --python monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Javascript">}}
{{< highlight javascript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
# customize your TS -> JS transpilation
tsc monster_generated.ts
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Typescript">}}
{{< highlight typescript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="PHP">}}
{{< highlight php >}}
cd flatbuffers/samples
./../flatc --php monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Dart">}}
{{< highlight dart >}}
cd flatbuffers/samples
./../flatc --dart monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lua">}}
{{< highlight lua >}}
cd flatbuffers/samples
./../flatc --lua monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lobster">}}
{{< highlight txt >}}
cd flatbuffers/samples
./../flatc --lobster monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Rust">}}
{{< highlight rust >}}
cd flatbuffers/samples
./../flatc --rust monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Swift">}}
{{< highlight swift >}}
cd flatbuffers/samples
./../flatc --swift monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

x, y, and z will contain 1.0, 2.0, and 3.0, respectively.

Note: Had we not set pos during serialization, it would be a null-value.

Similarly, we can access elements of the inventory vector by indexing it.
You can also iterate over the length of the array/vector representing the
FlatBuffers vector.

{{< code-snippet-group groupId="importGenerated">}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C++">}}
{{< highlight cpp >}}
auto inv = monster->inventory(); // A pointer to a `flatbuffers::Vector<>`.
auto inv_len = inv->size();
auto third_item = inv->Get(2);
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Java">}}
{{< highlight java >}}
import MyGame.Sample.*; //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Kotlin">}}
{{< highlight kotlin >}}
import MyGame.Sample.* //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C#">}}
{{< highlight csharp >}}
using FlatBuffers;
using MyGame.Sample; // The `flatc` generated files. (Monster, Vec3, etc.)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Go">}}
{{< highlight go >}}
import (
    flatbuffers "github.com/google/flatbuffers/go"
    sample "MyGame/Sample"
)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Python">}}
{{< highlight python >}}
cd flatbuffers/samples
./../flatc --python monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Javascript">}}
{{< highlight javascript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
# customize your TS -> JS transpilation
tsc monster_generated.ts
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Typescript">}}
{{< highlight typescript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="PHP">}}
{{< highlight php >}}
cd flatbuffers/samples
./../flatc --php monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Dart">}}
{{< highlight dart >}}
cd flatbuffers/samples
./../flatc --dart monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lua">}}
{{< highlight lua >}}
cd flatbuffers/samples
./../flatc --lua monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lobster">}}
{{< highlight txt >}}
cd flatbuffers/samples
./../flatc --lobster monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Rust">}}
{{< highlight rust >}}
cd flatbuffers/samples
./../flatc --rust monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Swift">}}
{{< highlight swift >}}
cd flatbuffers/samples
./../flatc --swift monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

For vectors of tables, you can access the elements like any other vector,
except you need to handle the result as a FlatBuffer table:

{{< code-snippet-group groupId="importGenerated">}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C++">}}
{{< highlight cpp >}}
auto weapons = monster->weapons(); // A pointer to a `flatbuffers::Vector<>`.
auto weapon_len = weapons->size();
auto second_weapon_name = weapons->Get(1)->name()->str();
auto second_weapon_damage = weapons->Get(1)->damage();
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Java">}}
{{< highlight java >}}
import MyGame.Sample.*; //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Kotlin">}}
{{< highlight kotlin >}}
import MyGame.Sample.* //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C#">}}
{{< highlight csharp >}}
using FlatBuffers;
using MyGame.Sample; // The `flatc` generated files. (Monster, Vec3, etc.)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Go">}}
{{< highlight go >}}
import (
    flatbuffers "github.com/google/flatbuffers/go"
    sample "MyGame/Sample"
)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Python">}}
{{< highlight python >}}
cd flatbuffers/samples
./../flatc --python monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Javascript">}}
{{< highlight javascript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
# customize your TS -> JS transpilation
tsc monster_generated.ts
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Typescript">}}
{{< highlight typescript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="PHP">}}
{{< highlight php >}}
cd flatbuffers/samples
./../flatc --php monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Dart">}}
{{< highlight dart >}}
cd flatbuffers/samples
./../flatc --dart monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lua">}}
{{< highlight lua >}}
cd flatbuffers/samples
./../flatc --lua monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lobster">}}
{{< highlight txt >}}
cd flatbuffers/samples
./../flatc --lobster monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Rust">}}
{{< highlight rust >}}
cd flatbuffers/samples
./../flatc --rust monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Swift">}}
{{< highlight swift >}}
cd flatbuffers/samples
./../flatc --swift monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{</ code-snippet-group >}}

Last, we can access our Equipped FlatBuffer union. Just like when we created
the union, we need to get both parts of the union: the type and the data.

We can access the type to dynamically cast the data as needed (since the union
only stores a FlatBuffer table).

{{< code-snippet-group groupId="importGenerated">}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C++">}}
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

{{< code-snippet-group-observer groupId="importGenerated" tabName="Java">}}
{{< highlight java >}}
import MyGame.Sample.*; //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Kotlin">}}
{{< highlight kotlin >}}
import MyGame.Sample.* //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C#">}}
{{< highlight csharp >}}
using FlatBuffers;
using MyGame.Sample; // The `flatc` generated files. (Monster, Vec3, etc.)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Go">}}
{{< highlight go >}}
import (
    flatbuffers "github.com/google/flatbuffers/go"
    sample "MyGame/Sample"
)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Python">}}
{{< highlight python >}}
cd flatbuffers/samples
./../flatc --python monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Javascript">}}
{{< highlight javascript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
# customize your TS -> JS transpilation
tsc monster_generated.ts
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Typescript">}}
{{< highlight typescript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="PHP">}}
{{< highlight php >}}
cd flatbuffers/samples
./../flatc --php monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Dart">}}
{{< highlight dart >}}
cd flatbuffers/samples
./../flatc --dart monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lua">}}
{{< highlight lua >}}
cd flatbuffers/samples
./../flatc --lua monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lobster">}}
{{< highlight txt >}}
cd flatbuffers/samples
./../flatc --lobster monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Rust">}}
{{< highlight rust >}}
cd flatbuffers/samples
./../flatc --rust monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Swift">}}
{{< highlight swift >}}
cd flatbuffers/samples
./../flatc --swift monster.fbs
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

{{< code-snippet-group groupId="importGenerated">}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C++">}}
{{< highlight cpp >}}
auto monster = GetMutableMonster(buffer_pointer);  // non-const
monster->mutate_hp(10);                      // Set the table `hp` field.
monster->mutable_pos()->mutate_z(4);         // Set struct field.
monster->mutable_inventory()->Mutate(0, 1);  // Set vector element.
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Java">}}
{{< highlight java >}}
import MyGame.Sample.*; //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder;
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Kotlin">}}
{{< highlight kotlin >}}
import MyGame.Sample.* //The `flatc` generated files. (Monster, Vec3, etc.)

import com.google.flatbuffers.FlatBufferBuilder
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="C#">}}
{{< highlight csharp >}}
using FlatBuffers;
using MyGame.Sample; // The `flatc` generated files. (Monster, Vec3, etc.)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Go">}}
{{< highlight go >}}
import (
    flatbuffers "github.com/google/flatbuffers/go"
    sample "MyGame/Sample"
)
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Python">}}
{{< highlight python >}}
cd flatbuffers/samples
./../flatc --python monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Javascript">}}
{{< highlight javascript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
# customize your TS -> JS transpilation
tsc monster_generated.ts
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Typescript">}}
{{< highlight typescript >}}
cd flatbuffers/samples
./../flatc --ts monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="PHP">}}
{{< highlight php >}}
cd flatbuffers/samples
./../flatc --php monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Dart">}}
{{< highlight dart >}}
cd flatbuffers/samples
./../flatc --dart monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lua">}}
{{< highlight lua >}}
cd flatbuffers/samples
./../flatc --lua monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Lobster">}}
{{< highlight txt >}}
cd flatbuffers/samples
./../flatc --lobster monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Rust">}}
{{< highlight rust >}}
cd flatbuffers/samples
./../flatc --rust monster.fbs
{{</ highlight>}}
{{</ code-snippet-group-observer>}}

{{< code-snippet-group-observer groupId="importGenerated" tabName="Swift">}}
{{< highlight swift >}}
cd flatbuffers/samples
./../flatc --swift monster.fbs
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
