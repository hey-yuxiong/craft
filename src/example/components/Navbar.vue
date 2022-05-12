<template>
  <nav class="navbar">
    <span class="brand"></span>
    <div class="actions">
      <a href="#" @click.prevent="publish">Publish</a>
      <a href="#" @click.prevent="toggleImportDialog">Import Layout</a>
      <a href="#" @click.prevent="toggleExportDialog">Export Layout</a>
      <el-switch
        :value="enabled"
        @input="updateState"
        active-color="#13ce66"
        inactive-color="gray">
      </el-switch>
    </div>

    <el-dialog
      title="Export"
      :visible.sync="showExportDialog"
      :modal="false"
      width="30%"
    >
      <div v-if="showExportDialog" class="disable-select">
        <textarea
          ref="exportTextarea"
          :rows="8"
          :value="editor.export()"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="toggleExportDialog">Close</el-button>
        <el-button size="medium" type="primary" @click="copyExport">Copy</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="Import"
      :visible.sync="showImportDialog"
      :modal="false"
      width="30%"
    >
      <textarea :rows="8" v-model="importData" />
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="toggleImportDialog">Close</el-button>
        <el-button size="medium" type="primary" @click="doImport">Import</el-button>
      </span>
    </el-dialog>
  </nav>
</template>

<script>
export default {
  inject: [
    'editor',
  ],
  data() {
    return {
      showExportDialog: false,
      showImportDialog: false,
      importData: '',
    };
  },
  computed: {
    enabled() {
      return this.editor.enabled;
    },
  },
  methods: {
    publish () {
      const loadingInstance = this.$loading({
        target: '.actions',
        text: '发布中...',
      })
      const axios = require('axios');
      axios.get('/build').then(function (response) {
        console.log(response);
        loadingInstance.close();
      }).catch(function (error) {
        console.error(error);
      })
    },
    updateState(enabled) {
      if (enabled) {
        this.editor.enable();
      } else {
        this.editor.disable();
      }
    },
    toggleExportDialog() {
      this.showExportDialog = !this.showExportDialog;
    },
    toggleImportDialog() {
      this.showImportDialog = !this.showImportDialog;
    },
    copyExport() {
      this.$refs.exportTextarea.select();
      document.execCommand('Copy');
      this.$message.success('Copied!');
    },
    doImport() {
      try {
        this.editor.import(this.importData);
        this.$message.success('Imported!');
        this.importData = '';
        this.toggleImportDialog();
      } catch ({ message }) {
        this.$message.error(message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../app.scss';

.navbar {
  position: relative;
  z-index: 100;
  display: flex;
  height: $navbar-height;
  line-height: $navbar-height;
  padding: 0 13px;
  background-color: white;
  box-shadow: 0 2px 3px rgba($color: #000000, $alpha: 0.03);
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.12);
  .brand {
    font-size: 26px;
    color: $color-black;
  }
  .actions {
    display: flex;
    align-items: center;
    margin-left: auto;
    padding: 0 12px;
    & > * {
      margin-left: 30px;
    }
  }
  a {
    display: block;
    color: $color-gray;
    text-decoration: none;
    &:hover {
      color: $color-black;
    }
  }
}

.disable-select {
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>

<style lang="scss">
.navbar .el-dialog__body {
  padding: 0 24px 12px;

  textarea {
    display: block;
    width: 100%;
    border-radius: 3px;
    color: rgba(0, 0, 0, 0.7);
  }
}
</style>
