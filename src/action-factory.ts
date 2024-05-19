import { OnInit, SourceAction, TargetAction, TransformerAction } from './action-step'
import { BaseDto } from './base.dto'
import { DefaultContext } from './default-action-params'
import { FormDefinition } from './form-definition'

export enum FactoryType {
  SOURCE = 'source',
  TRANSFORMER = 'transformer',
  TARGET = 'target'
}

abstract class ActionFactory<T extends OnInit> {
  constructor(
    protected readonly context: DefaultContext,
    public readonly type: FactoryType
  ) {}

  isThisAction(type: string): boolean {
    return this.getActionTypeName() === type
  }

  abstract getFormDefinition(): FormDefinition<{ type: string }>

  getActionTypeName(): string {
    return this.getFormDefinition().type
  }

  protected abstract fromDto(dto: BaseDto): T

  createInstanceFromDto(dto: BaseDto): T {
    const instance = this.fromDto(dto)
    instance.init(this.getActionTypeName(), this.context)

    if ('afterInit' in instance && typeof instance.afterInit === 'function') {
      instance.afterInit()
    }

    return instance
  }
}

export abstract class SourceFactory extends ActionFactory<SourceAction> {
  constructor(context: DefaultContext) {
    super(context, FactoryType.SOURCE)
  }
}

export abstract class TargetFactory extends ActionFactory<TargetAction> {
  constructor(context: DefaultContext) {
    super(context, FactoryType.TARGET)
  }
}

export abstract class TransformFactory extends ActionFactory<TransformerAction> {
  constructor(context: DefaultContext) {
    super(context, FactoryType.TRANSFORMER)
  }
}
