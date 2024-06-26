<template>
  <div> <!-- Agrega un contenedor raíz -->

    <v-sheet class="mx-auto container-main " width="300">
      <v-alert
      v-if="errors.length"
      type="error"
      :value="true"
   
      class="mt-4 "
    >
      <p v-for="(error, index) in errors" :key="index" class="mb-1">{{ error }}</p>
    </v-alert>
      <v-form ref="form" @submit.prevent="addTareaForm">
        <label>{{ label }}</label>
        <v-text-field
          type="text"
          placeholder="ej: some text"
          v-model="input_val"
          :rules="inputRules"
        ></v-text-field>
        <v-select
          label="Select"
          v-model="cat_selected"
          :items="categorias"
          name="select_cat"
          :rules="selectRules"
        ></v-select>
        <v-btn class="mt-2" type="submit" block>Submit</v-btn>
      </v-form>
      <br />
      <v-divider :thickness="2" class="border-opacity-100"></v-divider>
    </v-sheet>
    <v-container class="d-flex">
      <v-container>
        <v-table theme="dark">
          <thead>
            <tr>
              <th class="text-left">Tarea</th>
              <th class="text-left">Categoría</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tarea, index) in tareas" :key="index">
              <td>{{ tarea.name }}</td>
              <td>{{ tarea.cat }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-container>
      <v-container>
        <v-table theme="dark">
          <thead>
            <tr>
              <th class="text-left">Categorías</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(categoria, index) in categorias" :key="index">
              <td>{{ categoria }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      label: "Inserte alguna tarea para hacer",
      input_val: "",
      tareas: [],
      categorias: ["Matemáticas", "Programación"],
      cat_selected: "",
      errors : [],
      success : []
    };
  },
  methods: {
    //Para remover una tarea, solo lo quitaremos del array
    deleteTarea(tarea) {
      this.tareas = this.tareas.filter(t => t !== tarea);
    },
    //Para agregar una tarea, la agregaremos al array
    addTareaForm() {
      //en cada submit, se restablecen los valores
      this.errors=[];
      this.success = [];
      if(this.input_val !=''){
        if(this.cat_selected !=''){
          //la tarea solo se puede repetir si la categoría es diferente
          const existe = this.tareas.find(t => t.name === this.input_val && t.cat === this.cat_selected);
          if (!existe) {
            this.tareas.push({ name: this.input_val, cat: this.cat_selected });
            this.input_val = "";
            this.cat_selected = ""; // Limpia el campo de selección
          } else {
            this.errors.push("La tarea ya existe en la lista con la misma categoría asignada, selecciona otra categoría o cambie el nombre.");
          }
        }else{
          this.errors.push("Seleccione una categoría");
        }
      } else {
        this.errors.push("La tarea es requerida.");

      }
    }
  }
};
</script>

<style scoped>
.container-main {
  background-color: rgb(45, 45, 45);
  color: white;
}
.table-tareas {
  margin-top: 20px;
}
.custom-list .v-list-item {
  list-style-type: disc;
  list-style-position: inside;
  margin-left: 20px;
}
.custom-list .v-list-item::before {
  content: "•";
  display: inline-block;
  margin-right: 10px;
  color: black;
}
</style>
